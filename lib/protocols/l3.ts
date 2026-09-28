import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L3_PROTOCOLS: Protocol[] = [
  {
    id: "ipv4",
    acronym: "IPv4",
    fullName: { es: "Protocolo de Internet versión 4", en: "Internet Protocol version 4" },
    osi: [3],
    category: "addressing",
    status: "current",
    bodies: ["IETF"],
    year: 1981,
    identifiers: ["EtherType 0x0800"],
    summary: {
      es: "IPv4 le da a cada equipo una dirección numérica (como 192.168.1.10) y lleva los paquetes de red en red hasta su destino. Es el protocolo que hizo posible Internet y todavía transporta gran parte de su tráfico.",
      en: "IPv4 gives every device a numeric address (such as 192.168.1.10) and carries packets from network to network until they reach their destination. It is the protocol that made the Internet possible and still carries much of its traffic.",
    },
    analogy: {
      es: "Como el sistema postal: cada sobre lleva la dirección del remitente y del destinatario, y cada oficina de correos (router) solo decide a qué oficina siguiente enviarlo, sin conocer el recorrido completo.",
      en: "Like the postal system: every envelope carries sender and recipient addresses, and each post office (router) only decides which office to forward it to next, without knowing the whole route.",
    },
    everyday: {
      es: "La dirección que te asigna el router de tu casa (normalmente 192.168.x.x) y la IP pública que ve el resto de Internet.",
      en: "The address your home router gives you (usually 192.168.x.x) and the public IP the rest of the Internet sees.",
    },
    technical: [
      {
        es: "IPv4 ofrece un servicio de datagramas sin conexión y de mejor esfuerzo: no garantiza entrega, orden ni ausencia de duplicados. Las direcciones son de 32 bits (unos 4 300 millones) y se escriben en notación decimal con puntos. La cabecera mide entre 20 y 60 bytes (campo IHL de 4 bits, en palabras de 32 bits) e incluye TTL, el campo Protocol (6 = TCP, 17 = UDP, 1 = ICMP) y un checksum que solo cubre la cabecera y se recalcula en cada salto porque el TTL cambia.",
        en: "IPv4 provides a connectionless, best-effort datagram service: it guarantees neither delivery, ordering nor freedom from duplicates. Addresses are 32 bits (about 4.3 billion) written in dotted-decimal notation. The header is 20 to 60 bytes (4-bit IHL field, in 32-bit words) and includes the TTL, the Protocol field (6 = TCP, 17 = UDP, 1 = ICMP) and a checksum that covers only the header and is recomputed at every hop because the TTL changes.",
      },
      {
        es: "Cada router decrementa el TTL y descarta el paquete al llegar a 0, lo que evita bucles infinitos. Si un datagrama excede la MTU del siguiente enlace, el router lo fragmenta salvo que tenga el bit DF (Don't Fragment); los fragmentos comparten el campo Identification de 16 bits, llevan un Fragment Offset en unidades de 8 bytes y el bit MF (More Fragments), y solo el destino final los reensambla.",
        en: "Every router decrements the TTL and discards the packet when it reaches 0, preventing endless loops. If a datagram exceeds the next link's MTU, the router fragments it unless the DF (Don't Fragment) bit is set; fragments share the 16-bit Identification field, carry a Fragment Offset in 8-byte units and the MF (More Fragments) bit, and only the final destination reassembles them.",
      },
      {
        es: "El direccionamiento por clases (A, B, C) se sustituyó por CIDR (RFC 4632), que usa prefijos de longitud variable como /24 y permite agregar rutas. RFC 1918 reserva 10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16 para redes privadas, que salen a Internet mediante NAT. El agotamiento del espacio libre de IANA en 2011 es el principal motor de la adopción de IPv6.",
        en: "Classful addressing (A, B, C) was replaced by CIDR (RFC 4632), which uses variable-length prefixes such as /24 and enables route aggregation. RFC 1918 reserves 10.0.0.0/8, 172.16.0.0/12 and 192.168.0.0/16 for private networks, which reach the Internet through NAT. IANA's free pool running out in 2011 is the main driver of IPv6 adoption.",
      },
    ],
    howItWorks: [
      { es: "El host compara la IP destino con su propia red (IP y máscara) para decidir si entrega directo o por la puerta de enlace.", en: "The host compares the destination IP with its own network (IP and mask) to decide whether to deliver directly or via the default gateway." },
      { es: "Resuelve con ARP la dirección MAC del siguiente salto y encapsula el datagrama en una trama de L2.", en: "It resolves the next hop's MAC address with ARP and encapsulates the datagram in an L2 frame." },
      { es: "Cada router busca la ruta con el prefijo más largo que coincide (longest prefix match), decrementa el TTL y reenvía.", en: "Each router looks up the route with the longest matching prefix, decrements the TTL and forwards." },
      { es: "Si el TTL llega a 0 o no hay ruta, el router descarta el paquete y normalmente avisa con ICMP.", en: "If the TTL reaches 0 or there is no route, the router drops the packet and usually reports it with ICMP." },
      { es: "El destino reensambla los fragmentos, si los hay, y entrega el payload al protocolo indicado en el campo Protocol.", en: "The destination reassembles any fragments and hands the payload to the protocol named in the Protocol field." },
    ],
    facts: [
      { label: { es: "Longitud de dirección", en: "Address length" }, value: { es: "32 bits", en: "32 bits" } },
      { label: { es: "Cabecera", en: "Header" }, value: { es: "20 B mínimo, hasta 60 B con opciones", en: "20 B minimum, up to 60 B with options" } },
      { label: { es: "Tamaño máximo del datagrama", en: "Maximum datagram size" }, value: "65 535 B" },
      { label: { es: "Fragmentación", en: "Fragmentation" }, value: { es: "En origen y en routers (salvo DF=1)", en: "At the source and in routers (unless DF=1)" } },
      { label: { es: "Checksum", en: "Checksum" }, value: { es: "Solo de cabecera, recalculado en cada salto", en: "Header only, recomputed at every hop" } },
      { label: { es: "Redes privadas (RFC 1918)", en: "Private ranges (RFC 1918)" }, value: "10/8, 172.16/12, 192.168/16" },
    ],
    security: {
      es: "IPv4 no autentica el origen: falsificar la IP es trivial, lo que habilita ataques de reflexión; la mitigación es el filtrado de ingreso BCP 38 (RFC 2827). La fragmentación se ha usado para evadir firewalls y agotar memoria de reensamblado. Ni cifra ni protege la integridad del payload: para eso existen IPsec y TLS.",
      en: "IPv4 does not authenticate the source: spoofing an IP is trivial, which enables reflection attacks; the mitigation is BCP 38 ingress filtering (RFC 2827). Fragmentation has been abused to evade firewalls and exhaust reassembly memory. It neither encrypts nor protects payload integrity: that is what IPsec and TLS are for.",
    },
    tools: [
      { command: "ip addr", description: { es: "Muestra las direcciones IP y prefijos de cada interfaz (Linux)", en: "Shows the IP addresses and prefixes of each interface (Linux)" } },
      { command: "ip route get 8.8.8.8", description: { es: "Indica qué ruta, interfaz y origen usaría el kernel para un destino", en: "Shows which route, interface and source the kernel would use for a destination" } },
      { command: "ping -M do -s 1472 example.com", description: { es: "Envía pings con DF activado para probar la MTU de la ruta (Linux)", en: "Sends pings with DF set to probe the path MTU (Linux)" } },
    ],
    wireshark: "ip",
    relations: {
      dependsOn: ["ethernet", "wifi-mac", "ppp", "arp"],
      usedBy: ["tcp", "udp", "sctp", "icmp", "igmp", "ospf", "gre", "ipsec"],
      replacedBy: ["ipv6"],
    },
    specs: [
      { id: "RFC 791", title: { es: "Internet Protocol", en: "Internet Protocol" }, url: rfc(791) },
      { id: "RFC 4632", title: { es: "Enrutamiento entre dominios sin clases (CIDR)", en: "Classless Inter-domain Routing (CIDR)" }, url: rfc(4632) },
      { id: "RFC 1918", title: { es: "Asignación de direcciones para redes privadas", en: "Address Allocation for Private Internets" }, url: rfc(1918) },
      { id: "RFC 1812", title: { es: "Requisitos para routers IPv4", en: "Requirements for IP Version 4 Routers" }, url: rfc(1812) },
    ],
  },
  {
    id: "ipv6",
    acronym: "IPv6",
    fullName: { es: "Protocolo de Internet versión 6", en: "Internet Protocol version 6" },
    osi: [3],
    category: "addressing",
    status: "current",
    bodies: ["IETF"],
    year: 1995,
    identifiers: ["EtherType 0x86DD"],
    summary: {
      es: "IPv6 es el sucesor de IPv4, con direcciones mucho más largas (como 2001:db8::1) que alcanzan para que cada dispositivo del planeta tenga la suya sin necesidad de NAT. Además simplifica el trabajo de los routers.",
      en: "IPv6 is the successor to IPv4, with much longer addresses (such as 2001:db8::1) so every device on the planet can have its own without needing NAT. It also simplifies the routers' job.",
    },
    analogy: {
      es: "Si IPv4 es una ciudad que se quedó sin números de casa y obliga a vivir en edificios con un solo buzón, IPv6 es una ciudad con tantos números disponibles que cada habitación puede tener el suyo.",
      en: "If IPv4 is a city that ran out of house numbers and forces people into buildings sharing one mailbox, IPv6 is a city with so many numbers that every room can have its own.",
    },
    everyday: {
      es: "Las redes móviles y muchos proveedores de fibra ya te asignan IPv6; Google, YouTube y Netflix lo sirven de forma nativa.",
      en: "Mobile networks and many fiber providers already give you IPv6; Google, YouTube and Netflix serve it natively.",
    },
    technical: [
      {
        es: "IPv6 usa direcciones de 128 bits escritas en hexadecimal por grupos de 16 bits, donde :: abrevia una secuencia de ceros. La arquitectura de direccionamiento (RFC 4291) define unicast, multicast y anycast (el broadcast desaparece), el prefijo link-local fe80::/10, el unicast global 2000::/3 y la convención de subredes /64. Cada interfaz suele tener varias direcciones a la vez: link-local, global y temporales de privacidad (RFC 8981).",
        en: "IPv6 uses 128-bit addresses written in hexadecimal in 16-bit groups, where :: abbreviates a run of zeros. The addressing architecture (RFC 4291) defines unicast, multicast and anycast (broadcast is gone), the link-local prefix fe80::/10, global unicast 2000::/3 and the /64 subnet convention. An interface usually holds several addresses at once: link-local, global and temporary privacy addresses (RFC 8981).",
      },
      {
        es: "La cabecera es fija de 40 bytes y sin checksum: Version, Traffic Class (8 bits), Flow Label (20 bits), Payload Length, Next Header, Hop Limit y las dos direcciones. Las funciones opcionales se trasladan a cabeceras de extensión encadenadas mediante Next Header (Hop-by-Hop 0, Routing 43, Fragment 44, ESP 50, AH 51, Destination Options 60), lo que agiliza el reenvío en hardware.",
        en: "The header is a fixed 40 bytes with no checksum: Version, Traffic Class (8 bits), Flow Label (20 bits), Payload Length, Next Header, Hop Limit and the two addresses. Optional functions move into extension headers chained through Next Header (Hop-by-Hop 0, Routing 43, Fragment 44, ESP 50, AH 51, Destination Options 60), which speeds up hardware forwarding.",
      },
      {
        es: "Los routers nunca fragmentan: si un paquete no cabe, lo descartan y envían un ICMPv6 Packet Too Big, y solo el origen puede fragmentar con la cabecera Fragment. Todo enlace debe soportar una MTU mínima de 1280 bytes. La especificación vigente es RFC 8200 (2017), que reemplazó a RFC 2460 (1998), a su vez sucesor de la primera versión, RFC 1883 (1995).",
        en: "Routers never fragment: if a packet does not fit, they drop it and send an ICMPv6 Packet Too Big, and only the source may fragment using the Fragment header. Every link must support a minimum MTU of 1280 bytes. The current specification is RFC 8200 (2017), which replaced RFC 2460 (1998), itself the successor of the first version, RFC 1883 (1995).",
      },
    ],
    howItWorks: [
      { es: "Al activarse, la interfaz genera su dirección link-local fe80::/64 y verifica con DAD (NDP) que nadie más la usa.", en: "When it comes up, the interface generates its fe80::/64 link-local address and checks with DAD (NDP) that no one else uses it." },
      { es: "El router anuncia el prefijo de la red con Router Advertisements; el host forma su dirección global por SLAAC o la pide a DHCPv6.", en: "The router announces the network prefix in Router Advertisements; the host forms its global address via SLAAC or requests one from DHCPv6." },
      { es: "Para enviar, resuelve la MAC del siguiente salto con Neighbor Solicitation (NDP), que sustituye a ARP.", en: "To send, it resolves the next hop's MAC with a Neighbor Solicitation (NDP), which replaces ARP." },
      { es: "Cada router decrementa el Hop Limit y reenvía sin fragmentar ni recalcular checksum.", en: "Each router decrements the Hop Limit and forwards without fragmenting or recomputing a checksum." },
    ],
    facts: [
      { label: { es: "Longitud de dirección", en: "Address length" }, value: { es: "128 bits", en: "128 bits" } },
      { label: { es: "Cabecera", en: "Header" }, value: { es: "40 B fijos + cabeceras de extensión", en: "40 B fixed + extension headers" } },
      { label: { es: "MTU mínima", en: "Minimum MTU" }, value: "1280 B" },
      { label: { es: "Fragmentación", en: "Fragmentation" }, value: { es: "Solo en el origen", en: "Source only" } },
      { label: { es: "Checksum de cabecera", en: "Header checksum" }, value: { es: "No tiene", en: "None" } },
      { label: { es: "Broadcast", en: "Broadcast" }, value: { es: "No existe; se usa multicast", en: "Does not exist; multicast is used" } },
    ],
    security: {
      es: "Los Router Advertisements falsos pueden desviar el tráfico de toda una red; se mitigan con RA Guard (RFC 6105) en los switches. Las cabeceras de extensión se han usado para evadir filtros, y muchas redes las restringen. Una red con IPv6 activado pero sin políticas de firewall equivalentes a las de IPv4 es un punto ciego frecuente. IPsec es parte del diseño, pero su uso no es obligatorio.",
      en: "Rogue Router Advertisements can divert a whole network's traffic; RA Guard (RFC 6105) on switches mitigates them. Extension headers have been abused to evade filters, and many networks restrict them. A network with IPv6 enabled but without firewall policy equivalent to IPv4's is a common blind spot. IPsec is part of the design, but its use is not mandatory.",
    },
    tools: [
      { command: "ip -6 addr", description: { es: "Lista las direcciones IPv6 (link-local, global, temporales) de cada interfaz", en: "Lists each interface's IPv6 addresses (link-local, global, temporary)" } },
      { command: "ip -6 route", description: { es: "Muestra la tabla de rutas IPv6, incluida la ruta por defecto aprendida por RA", en: "Shows the IPv6 routing table, including the default route learned from RAs" } },
      { command: "ping -6 google.com", description: { es: "Comprueba la conectividad IPv6 de extremo a extremo", en: "Checks end-to-end IPv6 connectivity" } },
    ],
    wireshark: "ipv6",
    relations: {
      dependsOn: ["ethernet", "wifi-mac", "ppp", "ndp"],
      usedBy: ["tcp", "udp", "sctp", "icmpv6", "ospf", "ipsec", "dhcpv6"],
      replaces: ["ipv4"],
    },
    specs: [
      { id: "RFC 8200", title: { es: "Especificación de IPv6", en: "Internet Protocol, Version 6 (IPv6) Specification" }, url: rfc(8200) },
      { id: "RFC 4291", title: { es: "Arquitectura de direccionamiento de IPv6", en: "IP Version 6 Addressing Architecture" }, url: rfc(4291) },
      { id: "RFC 8981", title: { es: "Direcciones temporales para SLAAC", en: "Temporary Address Extensions for Stateless Address Autoconfiguration in IPv6" }, url: rfc(8981) },
    ],
  },
  {
    id: "icmp",
    acronym: "ICMP",
    fullName: { es: "Protocolo de Mensajes de Control de Internet", en: "Internet Control Message Protocol" },
    osi: [3],
    category: "control",
    status: "current",
    bodies: ["IETF"],
    year: 1981,
    identifiers: ["IP protocol 1"],
    summary: {
      es: "ICMP es el sistema de avisos de IPv4: informa cuando un destino es inalcanzable o un paquete tardó demasiado, y permite probar si un equipo responde. Es lo que usan ping y traceroute.",
      en: "ICMP is IPv4's notification system: it reports when a destination is unreachable or a packet took too long, and lets you test whether a host responds. It is what ping and traceroute use.",
    },
    analogy: {
      es: "Como el aviso de \"dirección inexistente\" que te devuelve el correo, o un \"¿me escuchas?\" por radio que espera un \"te escucho\".",
      en: "Like the \"address unknown\" notice the post office sends back, or a radio \"do you copy?\" waiting for a \"copy that\".",
    },
    everyday: {
      es: "Cuando haces ping a un sitio para ver si hay Internet, o cuando un videojuego muestra tu latencia.",
      en: "When you ping a site to see whether the Internet is up, or when a game shows your latency.",
    },
    technical: [
      {
        es: "ICMP viaja dentro de datagramas IPv4 (Protocol = 1) pero se considera parte integral de IP. Cada mensaje tiene Type (8 bits), Code (8 bits) y checksum; los mensajes de error incluyen la cabecera IP y al menos los primeros 8 bytes del datagrama que los causó, para que el emisor identifique la conexión afectada. Nunca se genera un error ICMP en respuesta a otro error ICMP, para evitar tormentas.",
        en: "ICMP travels inside IPv4 datagrams (Protocol = 1) but is considered an integral part of IP. Each message has a Type (8 bits), Code (8 bits) and checksum; error messages include the IP header and at least the first 8 bytes of the offending datagram so the sender can identify the affected connection. An ICMP error is never generated in response to another ICMP error, to avoid storms.",
      },
      {
        es: "Los tipos más usados son Echo Request (8) y Echo Reply (0) para ping; Destination Unreachable (3), con códigos como red, host o puerto inalcanzable; Time Exceeded (11), que un router envía al descartar un paquete con TTL 0; y Redirect (5). traceroute explota Time Exceeded enviando sondas con TTL 1, 2, 3… para descubrir cada salto.",
        en: "The most common types are Echo Request (8) and Echo Reply (0) for ping; Destination Unreachable (3), with codes such as network, host or port unreachable; Time Exceeded (11), sent by a router that drops a packet with TTL 0; and Redirect (5). traceroute exploits Time Exceeded by sending probes with TTL 1, 2, 3… to discover each hop.",
      },
      {
        es: "Path MTU Discovery (RFC 1191) depende del tipo 3 código 4, \"Fragmentation Needed and DF set\", que indica la MTU del siguiente salto. Bloquear todo ICMP en un firewall rompe PMTUD y provoca \"agujeros negros\": la conexión se establece pero se cuelga al enviar paquetes grandes.",
        en: "Path MTU Discovery (RFC 1191) relies on type 3 code 4, \"Fragmentation Needed and DF set\", which reports the next-hop MTU. Blocking all ICMP at a firewall breaks PMTUD and creates \"black holes\": the connection is established but hangs when large packets are sent.",
      },
    ],
    howItWorks: [
      { es: "ping envía un Echo Request (tipo 8) con un identificador y un número de secuencia.", en: "ping sends an Echo Request (type 8) with an identifier and a sequence number." },
      { es: "El destino responde con un Echo Reply (tipo 0) que copia el identificador, la secuencia y los datos.", en: "The destination answers with an Echo Reply (type 0) copying the identifier, sequence and data." },
      { es: "ping calcula el RTT y la pérdida comparando las secuencias enviadas y recibidas.", en: "ping computes RTT and loss by comparing sent and received sequence numbers." },
      { es: "traceroute envía sondas con TTL creciente; cada router que descarta una responde con Time Exceeded (tipo 11) y se revela.", en: "traceroute sends probes with increasing TTL; each router that drops one replies with Time Exceeded (type 11) and reveals itself." },
    ],
    facts: [
      { label: { es: "Cabecera", en: "Header" }, value: { es: "8 B (Type, Code, Checksum + 4 B según el tipo)", en: "8 B (Type, Code, Checksum + 4 B type-specific)" } },
      { label: { es: "Echo", en: "Echo" }, value: { es: "Request 8 / Reply 0", en: "Request 8 / Reply 0" } },
      { label: { es: "Errores comunes", en: "Common errors" }, value: { es: "3 Destination Unreachable, 11 Time Exceeded", en: "3 Destination Unreachable, 11 Time Exceeded" } },
      { label: { es: "PMTUD", en: "PMTUD" }, value: { es: "Tipo 3, código 4 (RFC 1191)", en: "Type 3, code 4 (RFC 1191)" } },
      { label: { es: "Puertos", en: "Ports" }, value: { es: "No usa puertos", en: "No ports" } },
    ],
    security: {
      es: "Se ha abusado de ICMP en inundaciones de ping, ataques Smurf (echo a direcciones de broadcast, hoy mitigado porque los routers ya no reenvían broadcast dirigido), redirecciones falsas y túneles encubiertos. La práctica recomendada es limitar la tasa y filtrar tipos concretos, no bloquearlo por completo, porque Destination Unreachable y Time Exceeded son necesarios para el buen funcionamiento de la red.",
      en: "ICMP has been abused in ping floods, Smurf attacks (echo to broadcast addresses, now mitigated because routers no longer forward directed broadcasts), forged redirects and covert tunnels. Best practice is to rate-limit and filter specific types rather than block it entirely, because Destination Unreachable and Time Exceeded are needed for the network to work properly.",
    },
    tools: [
      { command: "ping -c 4 example.com", description: { es: "Mide alcance, RTT y pérdida con Echo Request/Reply", en: "Measures reachability, RTT and loss with Echo Request/Reply" } },
      { command: "traceroute example.com", description: { es: "Descubre los saltos de la ruta (tracert en Windows)", en: "Discovers the hops along the path (tracert on Windows)" } },
      { command: "mtr example.com", description: { es: "Combina ping y traceroute con estadísticas de pérdida por salto", en: "Combines ping and traceroute with per-hop loss statistics" } },
    ],
    wireshark: "icmp",
    relations: { dependsOn: ["ipv4"], replacedBy: ["icmpv6"] },
    specs: [
      { id: "RFC 792", title: { es: "Internet Control Message Protocol", en: "Internet Control Message Protocol" }, url: rfc(792) },
      { id: "RFC 1191", title: { es: "Descubrimiento de la MTU de la ruta", en: "Path MTU Discovery" }, url: rfc(1191) },
      { id: "RFC 1812", title: { es: "Requisitos para routers IPv4 (reglas de generación de ICMP)", en: "Requirements for IP Version 4 Routers (ICMP generation rules)" }, url: rfc(1812) },
    ],
  },
  {
    id: "icmpv6",
    acronym: "ICMPv6",
    fullName: { es: "Protocolo de Mensajes de Control de Internet para IPv6", en: "Internet Control Message Protocol for IPv6" },
    osi: [3],
    category: "control",
    status: "current",
    bodies: ["IETF"],
    year: 1995,
    identifiers: ["IPv6 Next Header 58"],
    summary: {
      es: "ICMPv6 cumple en IPv6 el papel de ICMP (errores y ping), pero hace mucho más: sobre él funcionan el descubrimiento de vecinos, la autoconfiguración de direcciones y la gestión de multicast. Sin ICMPv6, IPv6 simplemente no funciona.",
      en: "ICMPv6 plays ICMP's role in IPv6 (errors and ping), but does far more: neighbor discovery, address autoconfiguration and multicast management all run on top of it. Without ICMPv6, IPv6 simply does not work.",
    },
    everyday: {
      es: "Cada vez que tu teléfono se conecta a una red con IPv6, intercambia mensajes ICMPv6 para obtener su dirección y encontrar al router.",
      en: "Every time your phone joins an IPv6 network, it exchanges ICMPv6 messages to get its address and find the router.",
    },
    technical: [
      {
        es: "ICMPv6 se identifica con Next Header 58 y conserva el formato Type/Code/Checksum, pero su checksum es obligatorio e incluye una pseudo-cabecera IPv6. Los tipos 0–127 son mensajes de error (1 Destination Unreachable, 2 Packet Too Big, 3 Time Exceeded, 4 Parameter Problem) y los tipos 128–255 son informativos (128 Echo Request, 129 Echo Reply).",
        en: "ICMPv6 is identified by Next Header 58 and keeps the Type/Code/Checksum format, but its checksum is mandatory and covers an IPv6 pseudo-header. Types 0–127 are error messages (1 Destination Unreachable, 2 Packet Too Big, 3 Time Exceeded, 4 Parameter Problem) and types 128–255 are informational (128 Echo Request, 129 Echo Reply).",
      },
      {
        es: "Como los routers IPv6 no fragmentan, Packet Too Big es imprescindible: le dice al origen qué MTU usar, y Path MTU Discovery para IPv6 (RFC 8201) depende de él. Además, ICMPv6 transporta NDP (tipos 133–137), que reemplaza a ARP y a la autoconfiguración, y MLD (130–132 y 143), que reemplaza a IGMP.",
        en: "Because IPv6 routers do not fragment, Packet Too Big is essential: it tells the source which MTU to use, and Path MTU Discovery for IPv6 (RFC 8201) depends on it. ICMPv6 also carries NDP (types 133–137), which replaces ARP and handles autoconfiguration, and MLD (130–132 and 143), which replaces IGMP.",
      },
      {
        es: "La especificación vigente es RFC 4443 (2006), que reemplazó a RFC 2463 y a la original RFC 1885 (1995). Para limitar abusos, los nodos deben aplicar límites de tasa a los errores que generan.",
        en: "The current specification is RFC 4443 (2006), which replaced RFC 2463 and the original RFC 1885 (1995). To limit abuse, nodes must rate-limit the error messages they originate.",
      },
    ],
    facts: [
      { label: { es: "Next Header", en: "Next Header" }, value: "58" },
      { label: { es: "Errores", en: "Errors" }, value: { es: "Tipos 0–127", en: "Types 0–127" } },
      { label: { es: "Informativos", en: "Informational" }, value: { es: "Tipos 128–255 (Echo 128/129)", en: "Types 128–255 (Echo 128/129)" } },
      { label: { es: "Packet Too Big", en: "Packet Too Big" }, value: { es: "Tipo 2, base de PMTUD (RFC 8201)", en: "Type 2, basis of PMTUD (RFC 8201)" } },
      { label: { es: "Checksum", en: "Checksum" }, value: { es: "Obligatorio, con pseudo-cabecera IPv6", en: "Mandatory, with IPv6 pseudo-header" } },
    ],
    security: {
      es: "Filtrar ICMPv6 como se hacía con ICMP en IPv4 rompe la red: sin Packet Too Big fallan las conexiones grandes y sin NDP no hay resolución de vecinos. RFC 4890 detalla qué tipos deben permitirse siempre en un firewall y cuáles pueden restringirse.",
      en: "Filtering ICMPv6 the way ICMP was filtered in IPv4 breaks the network: without Packet Too Big large transfers fail, and without NDP there is no neighbor resolution. RFC 4890 details which types a firewall must always allow and which may be restricted.",
    },
    tools: [
      { command: "ping -6 -c 4 example.com", description: { es: "Envía Echo Request ICMPv6 (tipo 128)", en: "Sends ICMPv6 Echo Requests (type 128)" } },
      { command: "traceroute -6 example.com", description: { es: "Traza la ruta IPv6 usando Time Exceeded", en: "Traces the IPv6 path using Time Exceeded" } },
      { command: "tracepath -6 example.com", description: { es: "Descubre la MTU de la ruta a partir de los Packet Too Big", en: "Discovers the path MTU from Packet Too Big messages" } },
    ],
    wireshark: "icmpv6",
    relations: { dependsOn: ["ipv6"], usedBy: ["ndp", "mld"], replaces: ["icmp"] },
    specs: [
      { id: "RFC 4443", title: { es: "ICMP para IPv6 (ICMPv6)", en: "Internet Control Message Protocol (ICMPv6) for the Internet Protocol Version 6 (IPv6) Specification" }, url: rfc(4443) },
      { id: "RFC 8201", title: { es: "Descubrimiento de la MTU de la ruta en IPv6", en: "Path MTU Discovery for IP version 6" }, url: rfc(8201) },
      { id: "RFC 4890", title: { es: "Recomendaciones para filtrar ICMPv6 en firewalls", en: "Recommendations for Filtering ICMPv6 Messages in Firewalls" }, url: rfc(4890) },
    ],
  },
  {
    id: "ndp",
    acronym: "NDP",
    fullName: { es: "Protocolo de Descubrimiento de Vecinos", en: "Neighbor Discovery Protocol" },
    osi: [3, 2],
    category: "control",
    status: "current",
    bodies: ["IETF"],
    year: 1996,
    identifiers: ["ICMPv6 types 133–137"],
    summary: {
      es: "NDP es cómo los equipos IPv6 se encuentran en la misma red local: averigua la dirección física (MAC) de los vecinos, localiza a los routers y permite que cada dispositivo se configure su propia dirección. Sustituye a ARP de IPv4.",
      en: "NDP is how IPv6 devices find each other on the same local network: it learns neighbors' physical (MAC) addresses, locates routers and lets each device configure its own address. It replaces IPv4's ARP.",
    },
    analogy: {
      es: "Como llegar a un edificio nuevo: preguntas en voz alta \"¿quién vive en el 5B?\", el portero anuncia periódicamente la dirección del edificio, y tú eliges un número de departamento después de comprobar que no esté ocupado.",
      en: "Like moving into a new building: you ask out loud \"who lives in 5B?\", the doorman periodically announces the building's address, and you pick an apartment number after checking nobody has it.",
    },
    everyday: {
      es: "Ocurre sin que lo notes cada vez que un dispositivo se une a una red IPv6 y obtiene dirección sin DHCP.",
      en: "It happens unnoticed every time a device joins an IPv6 network and gets an address without DHCP.",
    },
    technical: [
      {
        es: "NDP define cinco mensajes ICMPv6: Router Solicitation (133), Router Advertisement (134), Neighbor Solicitation (135), Neighbor Advertisement (136) y Redirect (137). Las solicitudes de resolución no se envían a broadcast sino a la dirección multicast de nodo solicitado (ff02::1:ffXX:XXXX, formada con los últimos 24 bits de la IP buscada), de modo que solo interrumpen a unos pocos equipos.",
        en: "NDP defines five ICMPv6 messages: Router Solicitation (133), Router Advertisement (134), Neighbor Solicitation (135), Neighbor Advertisement (136) and Redirect (137). Resolution requests are not broadcast but sent to the solicited-node multicast address (ff02::1:ffXX:XXXX, built from the last 24 bits of the target IP), so they only disturb a few hosts.",
      },
      {
        es: "Además de resolver direcciones, NDP detecta direcciones duplicadas (DAD), verifica que los vecinos siguen alcanzables (Neighbor Unreachability Detection, con estados INCOMPLETE, REACHABLE, STALE, DELAY y PROBE) y distribuye prefijos, MTU y router por defecto en los RA. Con esos prefijos, SLAAC (RFC 4862) permite a cada host construir su dirección global sin servidor.",
        en: "Beyond address resolution, NDP detects duplicate addresses (DAD), checks that neighbors remain reachable (Neighbor Unreachability Detection, with INCOMPLETE, REACHABLE, STALE, DELAY and PROBE states) and distributes prefixes, MTU and the default router in RAs. With those prefixes, SLAAC (RFC 4862) lets each host build its global address without a server.",
      },
      {
        es: "Los mensajes NDP deben llevar Hop Limit 255 y el receptor descarta cualquier otro valor, lo que garantiza que se originaron en el mismo enlace. La especificación vigente es RFC 4861 (2007), sucesora de RFC 2461 y de la primera versión, RFC 1970 (1996).",
        en: "NDP messages must carry Hop Limit 255 and receivers discard any other value, which guarantees they originated on the same link. The current specification is RFC 4861 (2007), successor to RFC 2461 and the first version, RFC 1970 (1996).",
      },
    ],
    howItWorks: [
      { es: "El host genera una dirección tentativa y envía un Neighbor Solicitation para ella (DAD); si nadie responde, la adopta.", en: "The host generates a tentative address and sends a Neighbor Solicitation for it (DAD); if no one answers, it adopts it." },
      { es: "Envía un Router Solicitation a ff02::2 (todos los routers) para no esperar al siguiente anuncio periódico.", en: "It sends a Router Solicitation to ff02::2 (all routers) instead of waiting for the next periodic advertisement." },
      { es: "El router responde con un Router Advertisement que incluye prefijos, flags M/O (uso de DHCPv6) y su tiempo de vida como router por defecto.", en: "The router replies with a Router Advertisement carrying prefixes, M/O flags (DHCPv6 usage) and its default-router lifetime." },
      { es: "Para enviar a un vecino, el host manda un Neighbor Solicitation a su dirección de nodo solicitado y recibe su MAC en el Neighbor Advertisement.", en: "To send to a neighbor, the host sends a Neighbor Solicitation to its solicited-node address and learns its MAC from the Neighbor Advertisement." },
    ],
    facts: [
      { label: { es: "Transporte", en: "Carried in" }, value: { es: "ICMPv6, tipos 133–137", en: "ICMPv6, types 133–137" } },
      { label: { es: "Hop Limit", en: "Hop Limit" }, value: { es: "Siempre 255 (solo enlace local)", en: "Always 255 (link-local only)" } },
      { label: { es: "Reemplaza a", en: "Replaces" }, value: { es: "ARP, ICMP Router Discovery y Redirect de IPv4", en: "IPv4 ARP, ICMP Router Discovery and Redirect" } },
      { label: { es: "Autoconfiguración", en: "Autoconfiguration" }, value: { es: "SLAAC (RFC 4862)", en: "SLAAC (RFC 4862)" } },
      { label: { es: "Detección de duplicados", en: "Duplicate detection" }, value: "DAD" },
    ],
    security: {
      es: "Igual que ARP, NDP confía en cualquier vecino: un atacante del mismo enlace puede falsificar NA (suplantación) o RA (router falso). SEND (RFC 3971) añade firmas criptográficas con direcciones CGA, pero casi no se implementa; en la práctica se usan RA Guard (RFC 6105) y funciones de seguridad de los switches como la inspección ND.",
      en: "Like ARP, NDP trusts any neighbor: an attacker on the same link can forge NAs (spoofing) or RAs (rogue router). SEND (RFC 3971) adds cryptographic signatures with CGA addresses, but is barely implemented; in practice RA Guard (RFC 6105) and switch security features such as ND inspection are used.",
    },
    multiLayerNote: {
      es: "NDP viaja en paquetes ICMPv6 sobre IPv6 (L3), pero su función principal, resolver direcciones de enlace (MAC) y descubrir vecinos del mismo segmento, es un servicio de L2. Es el equivalente de ARP, que en IPv4 vive directamente sobre Ethernet.",
      en: "NDP travels in ICMPv6 packets over IPv6 (L3), yet its main job, resolving link-layer (MAC) addresses and discovering neighbors on the same segment, is an L2 service. It is the equivalent of ARP, which in IPv4 sits directly on Ethernet.",
    },
    tools: [
      { command: "ip -6 neigh", description: { es: "Muestra la caché de vecinos IPv6 y el estado de cada entrada", en: "Shows the IPv6 neighbor cache and each entry's state" } },
      { command: "rdisc6 eth0", description: { es: "Envía un Router Solicitation y muestra el RA recibido (paquete ndisc6)", en: "Sends a Router Solicitation and prints the received RA (ndisc6 package)" } },
      { command: "netsh interface ipv6 show neighbors", description: { es: "Lista la caché de vecinos en Windows", en: "Lists the neighbor cache on Windows" } },
    ],
    wireshark: "icmpv6.type >= 133 && icmpv6.type <= 137",
    relations: { dependsOn: ["icmpv6", "ipv6"], usedBy: ["ipv6", "dhcpv6"], replaces: ["arp"] },
    specs: [
      { id: "RFC 4861", title: { es: "Descubrimiento de vecinos para IPv6", en: "Neighbor Discovery for IP version 6 (IPv6)" }, url: rfc(4861) },
      { id: "RFC 4862", title: { es: "Autoconfiguración de direcciones sin estado (SLAAC)", en: "IPv6 Stateless Address Autoconfiguration" }, url: rfc(4862) },
      { id: "RFC 3971", title: { es: "SEcure Neighbor Discovery (SEND)", en: "SEcure Neighbor Discovery (SEND)" }, url: rfc(3971) },
      { id: "RFC 6105", title: { es: "IPv6 Router Advertisement Guard", en: "IPv6 Router Advertisement Guard" }, url: rfc(6105) },
    ],
  },
  {
    id: "igmp",
    acronym: "IGMP",
    fullName: { es: "Protocolo de Gestión de Grupos de Internet", en: "Internet Group Management Protocol" },
    osi: [3],
    category: "control",
    status: "current",
    bodies: ["IETF"],
    year: 1989,
    identifiers: ["IP protocol 2"],
    summary: {
      es: "IGMP permite que un equipo avise al router de su red que quiere recibir un flujo multicast, como un canal de IPTV. Así el router solo envía ese tráfico a las redes donde alguien lo está pidiendo.",
      en: "IGMP lets a host tell its local router that it wants to receive a multicast stream, such as an IPTV channel. The router then only sends that traffic to networks where someone is asking for it.",
    },
    analogy: {
      es: "Como suscribirse a un canal de TV por cable: le dices a la central qué canal quieres y la señal solo llega a tu edificio mientras alguien lo esté viendo.",
      en: "Like subscribing to a cable TV channel: you tell the head-end which channel you want, and the signal only reaches your building while someone is watching it.",
    },
    everyday: {
      es: "La IPTV de muchos proveedores, que usa multicast para enviar cada canal una sola vez a miles de decodificadores.",
      en: "Many providers' IPTV, which uses multicast to send each channel once to thousands of set-top boxes.",
    },
    technical: [
      {
        es: "IGMP funciona entre los hosts y el router multicast del mismo enlace, dentro de datagramas IPv4 con Protocol = 2, TTL 1 y la opción Router Alert. El router envía Membership Queries periódicas a 224.0.0.1 (todos los hosts) y los hosts responden con Membership Reports indicando a qué grupos pertenecen; entre routers, el árbol de distribución se construye con otro protocolo, normalmente PIM.",
        en: "IGMP runs between hosts and the multicast router on the same link, inside IPv4 datagrams with Protocol = 2, TTL 1 and the Router Alert option. The router sends periodic Membership Queries to 224.0.0.1 (all hosts) and hosts reply with Membership Reports listing the groups they belong to; between routers, the distribution tree is built by another protocol, typically PIM.",
      },
      {
        es: "IGMPv1 (RFC 1112) solo permitía unirse; IGMPv2 (RFC 2236) añadió el mensaje Leave para bajas rápidas; IGMPv3 (RFC 3376, 2002) añadió filtrado por origen (modos INCLUDE/EXCLUDE), que permite pedir un grupo solo desde fuentes concretas y es la base del multicast específico de fuente (SSM, RFC 4607). Los reports de IGMPv3 se envían a 224.0.0.22.",
        en: "IGMPv1 (RFC 1112) only allowed joining; IGMPv2 (RFC 2236) added the Leave message for fast departures; IGMPv3 (RFC 3376, 2002) added source filtering (INCLUDE/EXCLUDE modes), which lets a host request a group only from specific sources and underpins Source-Specific Multicast (SSM, RFC 4607). IGMPv3 reports are sent to 224.0.0.22.",
      },
      {
        es: "Los switches de L2 suelen practicar IGMP snooping (RFC 4541): escuchan estos mensajes para reenviar el multicast solo por los puertos con receptores interesados, en lugar de inundar toda la VLAN.",
        en: "Layer 2 switches commonly perform IGMP snooping (RFC 4541): they listen to these messages to forward multicast only out of ports with interested receivers, rather than flooding the whole VLAN.",
      },
    ],
    howItWorks: [
      { es: "Una aplicación se une a un grupo (por ejemplo, 239.1.1.1) y el host envía un Membership Report no solicitado.", en: "An application joins a group (e.g. 239.1.1.1) and the host sends an unsolicited Membership Report." },
      { es: "El router registra que hay receptores en esa interfaz y empieza a reenviar el grupo (vía PIM hacia la fuente).", en: "The router records that there are receivers on that interface and starts forwarding the group (via PIM toward the source)." },
      { es: "Periódicamente envía General Queries; si ningún host responde por un grupo, deja de reenviarlo.", en: "It periodically sends General Queries; if no host answers for a group, it stops forwarding it." },
      { es: "Al salir, el host envía un Leave (v2) o un report de cambio de estado (v3) para acelerar la baja.", en: "On leaving, the host sends a Leave (v2) or a state-change report (v3) to speed up the prune." },
    ],
    facts: [
      { label: { es: "Protocolo IP", en: "IP protocol" }, value: "2" },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Solo enlace local (TTL 1)", en: "Link-local only (TTL 1)" } },
      { label: { es: "Versiones", en: "Versions" }, value: "v1 RFC 1112, v2 RFC 2236, v3 RFC 3376" },
      { label: { es: "Rango multicast IPv4", en: "IPv4 multicast range" }, value: "224.0.0.0/4" },
      { label: { es: "Equivalente IPv6", en: "IPv6 equivalent" }, value: "MLD" },
    ],
    security: {
      es: "IGMP no autentica: un host puede unirse a cualquier grupo o enviar reports falsos para atraer tráfico hacia su segmento. Los operadores controlan qué grupos se permiten por puerto o por suscriptor, y el snooping limita el impacto dentro de la red local.",
      en: "IGMP has no authentication: a host can join any group or send forged reports to pull traffic onto its segment. Operators control which groups are allowed per port or subscriber, and snooping limits the impact inside the LAN.",
    },
    tools: [
      { command: "ip maddr show", description: { es: "Muestra los grupos multicast a los que está unida cada interfaz", en: "Shows the multicast groups each interface has joined" } },
      { command: "cat /proc/net/igmp", description: { es: "Estado IGMP del kernel Linux por interfaz", en: "Linux kernel IGMP state per interface" } },
    ],
    wireshark: "igmp",
    relations: { dependsOn: ["ipv4"], replacedBy: ["mld"] },
    specs: [
      { id: "RFC 3376", title: { es: "IGMP versión 3", en: "Internet Group Management Protocol, Version 3" }, url: rfc(3376) },
      { id: "RFC 2236", title: { es: "IGMP versión 2", en: "Internet Group Management Protocol, Version 2" }, url: rfc(2236) },
      { id: "RFC 1112", title: { es: "Extensiones de host para multicast IP", en: "Host Extensions for IP Multicasting" }, url: rfc(1112) },
      { id: "RFC 4541", title: { es: "Consideraciones para switches con IGMP/MLD snooping", en: "Considerations for IGMP and MLD Snooping Switches" }, url: rfc(4541) },
    ],
  },
  {
    id: "mld",
    acronym: "MLD",
    fullName: { es: "Descubrimiento de Oyentes Multicast", en: "Multicast Listener Discovery" },
    osi: [3],
    category: "control",
    status: "current",
    bodies: ["IETF"],
    year: 1999,
    identifiers: ["ICMPv6 types 130–132, 143"],
    summary: {
      es: "MLD es la versión IPv6 de IGMP: los equipos lo usan para decirle al router qué flujos multicast quieren recibir. Además, IPv6 depende de multicast para funciones básicas, así que MLD está activo en casi cualquier red IPv6.",
      en: "MLD is the IPv6 version of IGMP: hosts use it to tell the router which multicast streams they want to receive. IPv6 also relies on multicast for basic functions, so MLD is active on almost every IPv6 network.",
    },
    everyday: {
      es: "Cuando un dispositivo se une a una red IPv6 anuncia por MLD sus grupos de nodo solicitado, que usa NDP.",
      en: "When a device joins an IPv6 network it announces via MLD its solicited-node groups, which NDP uses.",
    },
    technical: [
      {
        es: "MLD no es un protocolo IP independiente: sus mensajes son ICMPv6 enviados con dirección de origen link-local, Hop Limit 1 y la opción Router Alert en una cabecera Hop-by-Hop. MLDv1 (RFC 2710) usa los tipos 130 (Query), 131 (Report) y 132 (Done) y equivale a IGMPv2.",
        en: "MLD is not a standalone IP protocol: its messages are ICMPv6 sent from a link-local source address with Hop Limit 1 and the Router Alert option in a Hop-by-Hop header. MLDv1 (RFC 2710) uses types 130 (Query), 131 (Report) and 132 (Done) and is equivalent to IGMPv2.",
      },
      {
        es: "MLDv2 (RFC 3810, 2004) equivale a IGMPv3: añade filtrado por origen (INCLUDE/EXCLUDE) para multicast específico de fuente, usa el tipo 143 para los reports y los envía a ff02::16 (todos los routers con MLDv2). Es compatible hacia atrás con MLDv1. Los switches aplican MLD snooping igual que con IGMP.",
        en: "MLDv2 (RFC 3810, 2004) is equivalent to IGMPv3: it adds source filtering (INCLUDE/EXCLUDE) for source-specific multicast, uses type 143 for reports and sends them to ff02::16 (all MLDv2-capable routers). It is backward compatible with MLDv1. Switches apply MLD snooping just as with IGMP.",
      },
    ],
    facts: [
      { label: { es: "Transporte", en: "Carried in" }, value: "ICMPv6" },
      { label: { es: "Tipos", en: "Types" }, value: { es: "130 Query, 131/132 (v1), 143 Report v2", en: "130 Query, 131/132 (v1), 143 v2 Report" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Enlace local (Hop Limit 1)", en: "Link-local (Hop Limit 1)" } },
      { label: { es: "Equivalencia", en: "Equivalence" }, value: { es: "MLDv1 ≈ IGMPv2, MLDv2 ≈ IGMPv3", en: "MLDv1 ≈ IGMPv2, MLDv2 ≈ IGMPv3" } },
    ],
    security: {
      es: "Como IGMP, MLD no autentica a quien se une a un grupo. Los mensajes con origen que no sea link-local o con Hop Limit distinto de 1 deben descartarse, lo que impide inyectarlos desde fuera del enlace.",
      en: "Like IGMP, MLD does not authenticate group members. Messages with a non-link-local source or a Hop Limit other than 1 must be discarded, which prevents injecting them from off-link.",
    },
    tools: [
      { command: "ip -6 maddr show", description: { es: "Muestra los grupos multicast IPv6 de cada interfaz", en: "Shows each interface's IPv6 multicast groups" } },
      { command: "cat /proc/net/igmp6", description: { es: "Estado MLD del kernel Linux", en: "Linux kernel MLD state" } },
    ],
    wireshark: "icmpv6.type == 130 || icmpv6.type == 131 || icmpv6.type == 132 || icmpv6.type == 143",
    relations: { dependsOn: ["icmpv6", "ipv6"], usedBy: ["ndp"], replaces: ["igmp"] },
    specs: [
      { id: "RFC 3810", title: { es: "MLD versión 2 para IPv6", en: "Multicast Listener Discovery Version 2 (MLDv2) for IPv6" }, url: rfc(3810) },
      { id: "RFC 2710", title: { es: "MLD para IPv6", en: "Multicast Listener Discovery (MLD) for IPv6" }, url: rfc(2710) },
    ],
  },
  {
    id: "ipsec",
    acronym: "IPsec",
    fullName: { es: "Seguridad del Protocolo de Internet", en: "Internet Protocol Security" },
    osi: [3],
    category: "security",
    status: "current",
    bodies: ["IETF"],
    year: 1995,
    identifiers: ["IP protocol 50 (ESP)", "IP protocol 51 (AH)", "UDP 500 (IKE)", "UDP 4500 (NAT-T)"],
    summary: {
      es: "IPsec cifra y autentica los paquetes IP mismos, de modo que protege todo el tráfico entre dos equipos o dos redes sin que las aplicaciones tengan que hacer nada. Es la tecnología clásica de las VPN entre oficinas.",
      en: "IPsec encrypts and authenticates IP packets themselves, so it protects all traffic between two hosts or two networks without applications having to do anything. It is the classic technology behind site-to-site VPNs.",
    },
    analogy: {
      es: "Como meter cada carta dentro de un sobre blindado y sellado antes de enviarla: el cartero sigue repartiéndola, pero nadie en el camino puede leerla ni alterarla sin que se note.",
      en: "Like putting every letter inside an armored, sealed envelope before mailing it: the mail carrier still delivers it, but no one along the way can read or alter it without being noticed.",
    },
    everyday: {
      es: "Las VPN que conectan sucursales con la oficina central, los túneles hacia las nubes públicas y muchas VPN de acceso remoto con IKEv2.",
      en: "VPNs linking branch offices to headquarters, tunnels to public clouds, and many IKEv2 remote-access VPNs.",
    },
    technical: [
      {
        es: "La arquitectura (RFC 4301) define dos protocolos de protección. ESP (RFC 4303, protocolo IP 50) ofrece confidencialidad, integridad, autenticación de origen y anti-replay. AH (RFC 4302, protocolo IP 51) solo autentica, pero cubre también campos inmutables de la cabecera IP, por lo que no sobrevive al NAT y hoy se usa poco. Ambos funcionan en modo transporte (protege el payload) o en modo túnel (encapsula el paquete IP completo dentro de otro), que es el habitual en VPN.",
        en: "The architecture (RFC 4301) defines two protection protocols. ESP (RFC 4303, IP protocol 50) provides confidentiality, integrity, origin authentication and anti-replay. AH (RFC 4302, IP protocol 51) only authenticates, but also covers immutable IP header fields, so it does not survive NAT and is rarely used today. Both work in transport mode (protecting the payload) or tunnel mode (encapsulating the whole IP packet inside another), the usual choice for VPNs.",
      },
      {
        es: "Cada flujo protegido es una Security Association (SA) unidireccional, identificada por un SPI de 32 bits y guardada en la SAD; la SPD decide qué tráfico se protege, se descarta o pasa en claro. Las SA y sus claves se negocian con IKEv2 (RFC 7296) sobre UDP 500, que autentica a los extremos con certificados, EAP o clave precompartida y renueva las claves periódicamente.",
        en: "Each protected flow is a unidirectional Security Association (SA), identified by a 32-bit SPI and stored in the SAD; the SPD decides which traffic is protected, dropped or bypassed. SAs and their keys are negotiated with IKEv2 (RFC 7296) over UDP 500, which authenticates peers with certificates, EAP or a pre-shared key and rekeys periodically.",
      },
      {
        es: "Cuando IKE detecta un NAT en la ruta, ambos extremos pasan a UDP 4500 y encapsulan ESP dentro de UDP (NAT-T, RFC 3948) para que el NAT pueda traducir puertos. La primera especificación fue RFC 1825 (1995); la generación actual, de 2005, simplificó el diseño y RFC 8221 fija los algoritmos recomendados, como AES-GCM.",
        en: "When IKE detects a NAT on the path, both ends move to UDP 4500 and encapsulate ESP inside UDP (NAT-T, RFC 3948) so the NAT can translate ports. The first specification was RFC 1825 (1995); the current 2005 generation simplified the design, and RFC 8221 sets the recommended algorithms, such as AES-GCM.",
      },
    ],
    howItWorks: [
      { es: "IKE_SA_INIT: los extremos negocian algoritmos e intercambian Diffie-Hellman y nonces sobre UDP 500.", en: "IKE_SA_INIT: peers negotiate algorithms and exchange Diffie-Hellman values and nonces over UDP 500." },
      { es: "IKE_AUTH: ya cifrado, cada lado se autentica y se crea la primera Child SA con sus selectores de tráfico.", en: "IKE_AUTH: now encrypted, each side authenticates and the first Child SA is created with its traffic selectors." },
      { es: "El tráfico que coincide con la SPD se cifra con ESP, con número de secuencia para anti-replay.", en: "Traffic matching the SPD is encrypted with ESP, with a sequence number for anti-replay." },
      { es: "CREATE_CHILD_SA renueva las claves antes de que expire la SA, sin cortar el túnel.", en: "CREATE_CHILD_SA rekeys before the SA expires, without tearing down the tunnel." },
    ],
    facts: [
      { label: { es: "ESP", en: "ESP" }, value: { es: "Protocolo IP 50: cifrado + integridad", en: "IP protocol 50: encryption + integrity" } },
      { label: { es: "AH", en: "AH" }, value: { es: "Protocolo IP 51: solo integridad, incompatible con NAT", en: "IP protocol 51: integrity only, NAT-incompatible" } },
      { label: { es: "Negociación de claves", en: "Key exchange" }, value: "IKEv2, UDP 500 / 4500" },
      { label: { es: "Modos", en: "Modes" }, value: { es: "Transporte y túnel", en: "Transport and tunnel" } },
      { label: { es: "Identificador de SA", en: "SA identifier" }, value: { es: "SPI de 32 bits", en: "32-bit SPI" } },
    ],
    security: {
      es: "La seguridad depende de la configuración: se deben evitar IKEv1 en modo agresivo con clave precompartida, grupos Diffie-Hellman débiles y algoritmos como 3DES o MD5. ESP con cifrado nulo o AH por sí solo no dan confidencialidad. Las claves precompartidas cortas son vulnerables a ataques de diccionario fuera de línea.",
      en: "Security depends on configuration: avoid IKEv1 aggressive mode with pre-shared keys, weak Diffie-Hellman groups and algorithms such as 3DES or MD5. ESP with null encryption or AH alone provide no confidentiality. Short pre-shared keys are vulnerable to offline dictionary attacks.",
    },
    tools: [
      { command: "swanctl --list-sas", description: { es: "Lista las IKE SA y Child SA activas en strongSwan", en: "Lists active IKE and Child SAs in strongSwan" } },
      { command: "ip xfrm state", description: { es: "Muestra las SA instaladas en el kernel Linux (SPI, algoritmos)", en: "Shows SAs installed in the Linux kernel (SPI, algorithms)" } },
      { command: "ip xfrm policy", description: { es: "Muestra la SPD: qué tráfico se protege", en: "Shows the SPD: which traffic is protected" } },
    ],
    wireshark: "esp || ah || isakmp",
    relations: { dependsOn: ["ipv4", "ipv6", "udp"], usedBy: ["l2tp", "gre"] },
    specs: [
      { id: "RFC 4301", title: { es: "Arquitectura de seguridad para IP", en: "Security Architecture for the Internet Protocol" }, url: rfc(4301) },
      { id: "RFC 4303", title: { es: "IP Encapsulating Security Payload (ESP)", en: "IP Encapsulating Security Payload (ESP)" }, url: rfc(4303) },
      { id: "RFC 4302", title: { es: "IP Authentication Header (AH)", en: "IP Authentication Header" }, url: rfc(4302) },
      { id: "RFC 7296", title: { es: "Internet Key Exchange versión 2 (IKEv2)", en: "Internet Key Exchange Protocol Version 2 (IKEv2)" }, url: rfc(7296) },
      { id: "RFC 3948", title: { es: "Encapsulación UDP de paquetes ESP (NAT-T)", en: "UDP Encapsulation of IPsec ESP Packets" }, url: rfc(3948) },
    ],
  },
  {
    id: "ospf",
    acronym: "OSPF",
    fullName: { es: "Primero la Ruta Libre Más Corta", en: "Open Shortest Path First" },
    osi: [3],
    category: "routing",
    status: "current",
    bodies: ["IETF"],
    year: 1989,
    identifiers: ["IP protocol 89"],
    summary: {
      es: "OSPF es el protocolo con el que los routers de una misma organización se cuentan entre sí qué enlaces tienen y calculan automáticamente el mejor camino hacia cada red. Si un enlace se cae, recalculan y desvían el tráfico en segundos.",
      en: "OSPF is the protocol routers within one organization use to tell each other which links they have and automatically compute the best path to every network. If a link fails, they recompute and reroute traffic within seconds.",
    },
    analogy: {
      es: "Como si cada router tuviera el mismo mapa completo de carreteras y un GPS: todos calculan la ruta más corta sobre el mismo mapa, y cuando se cierra una calle, se avisa a todos para que actualicen el mapa.",
      en: "Like every router having the same complete road map and a GPS: they all compute the shortest route on the same map, and when a street closes, everyone is told so they can update the map.",
    },
    everyday: {
      es: "El enrutamiento interno de redes corporativas, campus universitarios y centros de datos.",
      en: "Internal routing in corporate networks, university campuses and data centers.",
    },
    technical: [
      {
        es: "OSPF es un protocolo de estado de enlace (link-state) de pasarela interior (IGP). Cada router describe sus enlaces y costos en LSA (Link State Advertisements) que se inundan de forma confiable por el área, de modo que todos construyen una base de datos de estado de enlace (LSDB) idéntica. Luego cada uno ejecuta el algoritmo SPF de Dijkstra con él mismo como raíz para obtener su tabla de rutas.",
        en: "OSPF is a link-state interior gateway protocol (IGP). Each router describes its links and costs in LSAs (Link State Advertisements) that are reliably flooded across the area, so all routers build an identical link-state database (LSDB). Each one then runs Dijkstra's SPF algorithm with itself as root to derive its routing table.",
      },
      {
        es: "Para escalar, la red se divide en áreas conectadas a un área troncal (área 0); los ABR resumen rutas entre áreas y los ASBR inyectan rutas externas. En redes broadcast como Ethernet se elige un Designated Router (DR) y un Backup (BDR) para reducir las adyacencias. Los mensajes van directamente sobre IP (protocolo 89) a 224.0.0.5 (todos los routers OSPF) y 224.0.0.6 (DR/BDR).",
        en: "To scale, the network is split into areas attached to a backbone (area 0); ABRs summarize routes between areas and ASBRs inject external routes. On broadcast networks such as Ethernet a Designated Router (DR) and a Backup (BDR) are elected to reduce adjacencies. Messages run directly over IP (protocol 89) to 224.0.0.5 (all OSPF routers) and 224.0.0.6 (DR/BDR).",
      },
      {
        es: "OSPFv2 (RFC 2328, 1998) enruta IPv4; OSPFv3 (RFC 5340, 2008) se rediseñó para IPv6, funciona por enlace con direcciones link-local y usa ff02::5 y ff02::6. La primera versión, OSPFv1, se publicó en RFC 1131 (1989). El costo de cada interfaz suele derivarse del ancho de banda, y a igual costo OSPF reparte el tráfico entre varias rutas (ECMP).",
        en: "OSPFv2 (RFC 2328, 1998) routes IPv4; OSPFv3 (RFC 5340, 2008) was redesigned for IPv6, runs per link using link-local addresses and uses ff02::5 and ff02::6. The first version, OSPFv1, was published in RFC 1131 (1989). Each interface's cost is usually derived from bandwidth, and at equal cost OSPF balances traffic across several paths (ECMP).",
      },
    ],
    howItWorks: [
      { es: "Hello: los routers descubren vecinos y acuerdan parámetros (área, intervalos Hello/Dead, máscara).", en: "Hello: routers discover neighbors and agree on parameters (area, Hello/Dead intervals, mask)." },
      { es: "ExStart/Exchange: intercambian resúmenes de su LSDB con paquetes Database Description (DBD).", en: "ExStart/Exchange: they exchange LSDB summaries in Database Description (DBD) packets." },
      { es: "Loading: piden los LSA que les faltan con Link State Request y los reciben en Link State Update, confirmados con LSAck.", en: "Loading: they request missing LSAs with Link State Requests and receive them in Link State Updates, acknowledged with LSAcks." },
      { es: "Full: con la LSDB sincronizada, cada router ejecuta SPF e instala las mejores rutas.", en: "Full: with the LSDB synchronized, each router runs SPF and installs the best routes." },
      { es: "Ante un cambio, el router afectado inunda un LSA nuevo y todos recalculan.", en: "On a change, the affected router floods a new LSA and everyone recomputes." },
    ],
    facts: [
      { label: { es: "Tipo", en: "Type" }, value: { es: "IGP de estado de enlace", en: "Link-state IGP" } },
      { label: { es: "Algoritmo", en: "Algorithm" }, value: { es: "SPF de Dijkstra", en: "Dijkstra SPF" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Directo sobre IP, protocolo 89", en: "Directly over IP, protocol 89" } },
      { label: { es: "Multicast", en: "Multicast" }, value: "224.0.0.5 / 224.0.0.6 (ff02::5 / ff02::6)" },
      { label: { es: "Jerarquía", en: "Hierarchy" }, value: { es: "Áreas alrededor del área 0", en: "Areas around area 0" } },
      { label: { es: "Versiones", en: "Versions" }, value: "OSPFv2 (IPv4), OSPFv3 (IPv6)" },
    ],
    security: {
      es: "Un router falso que forme adyacencia puede inyectar rutas y desviar tráfico. OSPFv2 admite autenticación criptográfica (HMAC-SHA en RFC 5709; la de texto plano no protege nada) y OSPFv3 usa el Authentication Trailer (RFC 7166) o IPsec. También conviene declarar pasivas las interfaces hacia usuarios para no aceptar vecinos allí.",
      en: "A rogue router that forms an adjacency can inject routes and divert traffic. OSPFv2 supports cryptographic authentication (HMAC-SHA in RFC 5709; plaintext protects nothing) and OSPFv3 uses the Authentication Trailer (RFC 7166) or IPsec. User-facing interfaces should also be made passive so no neighbors are accepted there.",
    },
    tools: [
      { command: "vtysh -c \"show ip ospf neighbor\"", description: { es: "Lista vecinos OSPF y su estado (FRRouting)", en: "Lists OSPF neighbors and their state (FRRouting)" } },
      { command: "vtysh -c \"show ip ospf database\"", description: { es: "Muestra la LSDB con los LSA de cada tipo", en: "Shows the LSDB with LSAs of each type" } },
      { command: "ip route show proto ospf", description: { es: "Rutas instaladas en el kernel por OSPF", en: "Routes installed in the kernel by OSPF" } },
    ],
    wireshark: "ospf",
    relations: { dependsOn: ["ipv4", "ipv6"], replaces: ["rip"] },
    specs: [
      { id: "RFC 2328", title: { es: "OSPF versión 2", en: "OSPF Version 2" }, url: rfc(2328) },
      { id: "RFC 5340", title: { es: "OSPF para IPv6 (OSPFv3)", en: "OSPF for IPv6" }, url: rfc(5340) },
      { id: "RFC 5709", title: { es: "Autenticación criptográfica HMAC-SHA para OSPFv2", en: "OSPFv2 HMAC-SHA Cryptographic Authentication" }, url: rfc(5709) },
    ],
  },
  {
    id: "rip",
    acronym: "RIP",
    fullName: { es: "Protocolo de Información de Enrutamiento", en: "Routing Information Protocol" },
    osi: [3],
    category: "routing",
    status: "legacy",
    bodies: ["IETF"],
    year: 1988,
    identifiers: ["UDP 520", "UDP 521 (RIPng)"],
    summary: {
      es: "RIP es uno de los protocolos de enrutamiento más antiguos y sencillos: cada router le cuenta a sus vecinos a cuántos saltos está de cada red. Es fácil de configurar, pero lento y limitado a redes pequeñas, por lo que hoy casi se ha abandonado.",
      en: "RIP is one of the oldest and simplest routing protocols: each router tells its neighbors how many hops away it is from every network. It is easy to set up but slow and limited to small networks, so it has been largely abandoned.",
    },
    analogy: {
      es: "Como pedir indicaciones de boca en boca: cada vecino te dice \"la plaza está a 3 cuadras de mí\", pero nadie tiene el mapa completo, y un rumor equivocado tarda en corregirse.",
      en: "Like word-of-mouth directions: each neighbor says \"the square is 3 blocks from me\", but nobody has the full map, and a wrong rumor takes a while to be corrected.",
    },
    everyday: {
      es: "Laboratorios de redes, cursos de certificación y algunos equipos antiguos o de pequeña oficina.",
      en: "Networking labs, certification courses and some old or small-office equipment.",
    },
    technical: [
      {
        es: "RIP es un protocolo de vector de distancia basado en Bellman-Ford. La métrica es el número de saltos, con un máximo de 15; el valor 16 significa infinito (inalcanzable), lo que limita el diámetro de la red. Cada router envía su tabla completa a los vecinos cada 30 segundos por UDP 520; una ruta sin actualizar expira a los 180 s y se elimina tras 120 s adicionales de recolección.",
        en: "RIP is a distance-vector protocol based on Bellman-Ford. The metric is hop count, with a maximum of 15; the value 16 means infinity (unreachable), which limits the network diameter. Each router sends its full table to neighbors every 30 seconds over UDP 520; a route not refreshed times out after 180 s and is removed after a further 120 s of garbage collection.",
      },
      {
        es: "Su convergencia lenta provoca el problema de \"cuenta hasta el infinito\", que se mitiga con horizonte dividido (split horizon), envenenamiento en reversa (poison reverse) y actualizaciones disparadas. RIPv1 (RFC 1058, 1988) es con clases y usa broadcast; RIPv2 (RFC 2453) añade máscara de subred (CIDR), siguiente salto, etiqueta de ruta, autenticación y multicast a 224.0.0.9.",
        en: "Its slow convergence causes the \"count to infinity\" problem, mitigated with split horizon, poison reverse and triggered updates. RIPv1 (RFC 1058, 1988) is classful and uses broadcast; RIPv2 (RFC 2453) adds the subnet mask (CIDR), next hop, route tag, authentication and multicast to 224.0.0.9.",
      },
      {
        es: "RIPng (RFC 2080) adapta el protocolo a IPv6 sobre UDP 521 y el grupo ff02::9, delegando la autenticación en IPsec. En redes actuales ha sido sustituido por OSPF, IS-IS o EIGRP, que convergen más rápido y escalan mejor.",
        en: "RIPng (RFC 2080) adapts the protocol to IPv6 over UDP 521 and the ff02::9 group, delegating authentication to IPsec. In modern networks it has been replaced by OSPF, IS-IS or EIGRP, which converge faster and scale better.",
      },
    ],
    facts: [
      { label: { es: "Tipo", en: "Type" }, value: { es: "Vector de distancia (Bellman-Ford)", en: "Distance vector (Bellman-Ford)" } },
      { label: { es: "Métrica", en: "Metric" }, value: { es: "Saltos, máximo 15 (16 = infinito)", en: "Hops, maximum 15 (16 = infinity)" } },
      { label: { es: "Actualizaciones", en: "Updates" }, value: { es: "Tabla completa cada 30 s", en: "Full table every 30 s" } },
      { label: { es: "Transporte", en: "Transport" }, value: "UDP 520 (RIPng: UDP 521)" },
      { label: { es: "Multicast", en: "Multicast" }, value: "224.0.0.9 (RIPv2), ff02::9 (RIPng)" },
    ],
    security: {
      es: "RIPv1 no tiene autenticación: cualquiera en el segmento puede anunciar rutas falsas. RIPv2 admite autenticación MD5 (RFC 2082) y HMAC-SHA (RFC 4822); la de texto plano no aporta seguridad real. Se recomienda habilitar RIP solo en las interfaces necesarias.",
      en: "RIPv1 has no authentication: anyone on the segment can advertise bogus routes. RIPv2 supports MD5 (RFC 2082) and HMAC-SHA (RFC 4822) authentication; plaintext offers no real security. RIP should be enabled only on the interfaces that need it.",
    },
    tools: [
      { command: "vtysh -c \"show ip rip\"", description: { es: "Muestra las rutas RIP aprendidas y su métrica (FRRouting)", en: "Shows learned RIP routes and their metric (FRRouting)" } },
      { command: "vtysh -c \"show ip rip status\"", description: { es: "Temporizadores, versión y vecinos de RIP", en: "RIP timers, version and neighbors" } },
    ],
    wireshark: "rip || ripng",
    relations: { dependsOn: ["udp", "ipv4", "ipv6"], replacedBy: ["ospf", "isis", "eigrp"] },
    specs: [
      { id: "RFC 2453", title: { es: "RIP versión 2", en: "RIP Version 2" }, url: rfc(2453) },
      { id: "RFC 2080", title: { es: "RIPng para IPv6", en: "RIPng for IPv6" }, url: rfc(2080) },
      { id: "RFC 1058", title: { es: "Routing Information Protocol", en: "Routing Information Protocol" }, url: rfc(1058) },
    ],
  },
  {
    id: "eigrp",
    acronym: "EIGRP",
    fullName: { es: "Protocolo de Enrutamiento de Gateway Interior Mejorado", en: "Enhanced Interior Gateway Routing Protocol" },
    osi: [3],
    category: "routing",
    status: "current",
    bodies: ["Cisco", "IETF"],
    year: 2016,
    identifiers: ["IP protocol 88"],
    summary: {
      es: "EIGRP es un protocolo de enrutamiento creado por Cisco que calcula rutas rápidamente y guarda de antemano un camino de respaldo, para cambiar a él casi al instante si el principal falla. Se usa sobre todo en redes con equipos Cisco.",
      en: "EIGRP is a routing protocol created by Cisco that computes routes quickly and keeps a backup path ready in advance, switching to it almost instantly if the primary fails. It is used mainly in networks built on Cisco equipment.",
    },
    everyday: {
      es: "Redes empresariales y de sucursales construidas con routers Cisco.",
      en: "Enterprise and branch networks built with Cisco routers.",
    },
    technical: [
      {
        es: "EIGRP es un protocolo de vector de distancia avanzado basado en el algoritmo DUAL (Diffusing Update Algorithm), que garantiza rutas libres de bucles en todo momento. Para cada destino guarda en su tabla de topología la distancia factible (FD) del mejor camino (successor) y las distancias reportadas por los vecinos; un vecino cuya distancia reportada es menor que la FD cumple la condición de factibilidad y se convierte en feasible successor, un respaldo que se activa sin recalcular.",
        en: "EIGRP is an advanced distance-vector protocol built on the DUAL (Diffusing Update Algorithm), which guarantees loop-free routes at every instant. For each destination its topology table stores the feasible distance (FD) of the best path (successor) and the distances reported by neighbors; a neighbor whose reported distance is lower than the FD meets the feasibility condition and becomes a feasible successor, a backup that is activated without recomputation.",
      },
      {
        es: "Si no hay feasible successor, la ruta pasa a estado activo y el router envía Queries a sus vecinos hasta recibir todas las Replies; si tardan demasiado, la ruta queda en \"stuck in active\". A diferencia de RIP, solo envía actualizaciones parciales cuando algo cambia, de forma confiable mediante su propio RTP (Reliable Transport Protocol), directamente sobre IP (protocolo 88) y al grupo 224.0.0.10 (ff02::a en IPv6).",
        en: "If there is no feasible successor, the route goes active and the router sends Queries to its neighbors until all Replies arrive; if they take too long, the route becomes \"stuck in active\". Unlike RIP, it only sends partial updates when something changes, reliably via its own RTP (Reliable Transport Protocol), directly over IP (protocol 88) to group 224.0.0.10 (ff02::a for IPv6).",
      },
      {
        es: "Su métrica compuesta combina, por defecto, el ancho de banda mínimo y el retardo acumulado de la ruta (coeficientes K1 y K3). Cisco lo introdujo a principios de los años noventa como protocolo propietario y en 2016 publicó su funcionamiento básico en RFC 7868, de carácter informativo, no como estándar del IETF.",
        en: "Its composite metric combines, by default, the path's minimum bandwidth and cumulative delay (K1 and K3 coefficients). Cisco introduced it in the early 1990s as a proprietary protocol and in 2016 published its basic operation as RFC 7868, an Informational document rather than an IETF standard.",
      },
    ],
    facts: [
      { label: { es: "Tipo", en: "Type" }, value: { es: "Vector de distancia avanzado (DUAL)", en: "Advanced distance vector (DUAL)" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Directo sobre IP, protocolo 88", en: "Directly over IP, protocol 88" } },
      { label: { es: "Multicast", en: "Multicast" }, value: "224.0.0.10 / ff02::a" },
      { label: { es: "Métrica por defecto", en: "Default metric" }, value: { es: "Ancho de banda + retardo", en: "Bandwidth + delay" } },
      { label: { es: "Respaldo precalculado", en: "Precomputed backup" }, value: "Feasible successor" },
      { label: { es: "Estatus del RFC", en: "RFC status" }, value: { es: "Informativo (RFC 7868)", en: "Informational (RFC 7868)" } },
    ],
    security: {
      es: "Sin autenticación, un equipo en el segmento puede formar vecindad e inyectar rutas. EIGRP admite autenticación MD5 y, en el modo con nombre de Cisco, HMAC-SHA-256. Las interfaces hacia usuarios deben configurarse como pasivas.",
      en: "Without authentication, a device on the segment can form an adjacency and inject routes. EIGRP supports MD5 authentication and, in Cisco's named mode, HMAC-SHA-256. User-facing interfaces should be configured as passive.",
    },
    tools: [
      { command: "show ip eigrp neighbors", description: { es: "Lista vecinos EIGRP, hold time y SRTT (Cisco IOS)", en: "Lists EIGRP neighbors, hold time and SRTT (Cisco IOS)" } },
      { command: "show ip eigrp topology", description: { es: "Muestra successors, feasible successors y distancias (Cisco IOS)", en: "Shows successors, feasible successors and distances (Cisco IOS)" } },
    ],
    wireshark: "eigrp",
    relations: { dependsOn: ["ipv4", "ipv6"], replaces: ["rip"] },
    specs: [
      { id: "RFC 7868", title: { es: "Enhanced Interior Gateway Routing Protocol de Cisco", en: "Cisco's Enhanced Interior Gateway Routing Protocol (EIGRP)" }, url: rfc(7868) },
    ],
  },
  {
    id: "isis",
    acronym: "IS-IS",
    fullName: { es: "Sistema Intermedio a Sistema Intermedio", en: "Intermediate System to Intermediate System" },
    osi: [3, 2],
    category: "routing",
    status: "current",
    bodies: ["ISO/IEC", "IETF"],
    year: 1990,
    identifiers: ["NLPID 0x83"],
    summary: {
      es: "IS-IS es un protocolo de enrutamiento de estado de enlace, parecido a OSPF, que prefieren los grandes proveedores de Internet por su estabilidad y facilidad para crecer. Nació en el mundo OSI y se adaptó para enrutar IP.",
      en: "IS-IS is a link-state routing protocol, similar to OSPF, favored by large Internet providers for its stability and ease of growth. It was born in the OSI world and adapted to route IP.",
    },
    everyday: {
      es: "El enrutamiento interno de las redes troncales de muchos ISP y operadores, y de algunos grandes centros de datos.",
      en: "Internal routing in the backbones of many ISPs and carriers, and in some large data centers.",
    },
    technical: [
      {
        es: "IS-IS (ISO/IEC 10589) es un IGP de estado de enlace: cada router inunda LSP (Link State PDUs) y ejecuta SPF sobre la base de datos resultante, igual que OSPF. RFC 1195 (1990) definió \"Integrated IS-IS\" para transportar prefijos IPv4 y RFC 5308 añadió IPv6, de modo que una sola instancia enruta ambas familias. Toda la información viaja en TLV, lo que lo hace muy fácil de extender (ingeniería de tráfico, Segment Routing).",
        en: "IS-IS (ISO/IEC 10589) is a link-state IGP: each router floods LSPs (Link State PDUs) and runs SPF over the resulting database, just like OSPF. RFC 1195 (1990) defined \"Integrated IS-IS\" to carry IPv4 prefixes and RFC 5308 added IPv6, so a single instance routes both families. All information travels in TLVs, making it very easy to extend (traffic engineering, Segment Routing).",
      },
      {
        es: "La jerarquía tiene dos niveles: Level 1 (dentro de un área) y Level 2 (troncal entre áreas); un router puede ser L1, L2 o L1/L2, y los límites de área están en los enlaces, no dentro de los routers como en OSPF. Cada router se identifica con un NET (dirección NSAP) que contiene el área y un System ID de 6 bytes. Los tipos de PDU son Hello (IIH), LSP y los resúmenes CSNP y PSNP.",
        en: "The hierarchy has two levels: Level 1 (within an area) and Level 2 (backbone between areas); a router can be L1, L2 or L1/L2, and area boundaries lie on links, not inside routers as in OSPF. Each router is identified by a NET (NSAP address) containing the area and a 6-byte System ID. The PDU types are Hello (IIH), LSP and the CSNP and PSNP summaries.",
      },
      {
        es: "Las métricas originales (\"narrow\") eran de 6 bits por enlace; RFC 5305 introdujo métricas amplias de 24 bits, hoy las habituales. Como no depende de IP para transportar sus propios mensajes, un error de direccionamiento IP no rompe las adyacencias.",
        en: "The original (\"narrow\") metrics were 6 bits per link; RFC 5305 introduced 24-bit wide metrics, now the norm. Because it does not depend on IP to carry its own messages, an IP addressing mistake does not break adjacencies.",
      },
    ],
    howItWorks: [
      { es: "Los routers envían IIH directamente en tramas de L2 para descubrir vecinos y acordar nivel y área.", en: "Routers send IIHs directly in L2 frames to discover neighbors and agree on level and area." },
      { es: "En enlaces broadcast se elige un DIS (Designated IS), que envía CSNP periódicos con el resumen de la base de datos.", en: "On broadcast links a DIS (Designated IS) is elected and sends periodic CSNPs summarizing the database." },
      { es: "Los routers solicitan con PSNP los LSP que les faltan o que están desactualizados.", en: "Routers request missing or outdated LSPs with PSNPs." },
      { es: "Con la base sincronizada por nivel, cada router ejecuta SPF e instala las rutas IPv4 e IPv6.", en: "With the database synchronized per level, each router runs SPF and installs IPv4 and IPv6 routes." },
    ],
    facts: [
      { label: { es: "Tipo", en: "Type" }, value: { es: "IGP de estado de enlace", en: "Link-state IGP" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Directo sobre L2, no sobre IP", en: "Directly over L2, not over IP" } },
      { label: { es: "Niveles", en: "Levels" }, value: { es: "L1 (intra-área), L2 (troncal)", en: "L1 (intra-area), L2 (backbone)" } },
      { label: { es: "Identificador", en: "Identifier" }, value: { es: "NET con System ID de 6 B", en: "NET with 6-byte System ID" } },
      { label: { es: "Métricas", en: "Metrics" }, value: { es: "Narrow 6 bits, wide 24 bits (RFC 5305)", en: "Narrow 6-bit, wide 24-bit (RFC 5305)" } },
    ],
    security: {
      es: "Como no corre sobre IP, IS-IS no se puede atacar desde redes remotas: el atacante necesita acceso al mismo enlace. Aun así, conviene habilitar autenticación HMAC (RFC 5304 para HMAC-MD5, RFC 5310 para HMAC-SHA) en Hellos y LSP.",
      en: "Because it does not run over IP, IS-IS cannot be attacked from remote networks: an attacker needs access to the same link. HMAC authentication (RFC 5304 for HMAC-MD5, RFC 5310 for HMAC-SHA) should still be enabled on Hellos and LSPs.",
    },
    multiLayerNote: {
      es: "IS-IS calcula rutas para la capa 3, pero sus mensajes no viajan en paquetes IP: se encapsulan directamente en tramas de enlace (LLC en Ethernet, hacia las direcciones multicast 01:80:C2:00:00:14 y :15). Es un protocolo de L3 transportado sobre L2.",
      en: "IS-IS computes routes for layer 3, yet its messages are not carried in IP packets: they are encapsulated directly in link-layer frames (LLC on Ethernet, to multicast addresses 01:80:C2:00:00:14 and :15). It is an L3 protocol carried over L2.",
    },
    tools: [
      { command: "vtysh -c \"show isis neighbor\"", description: { es: "Lista adyacencias IS-IS, nivel y estado (FRRouting)", en: "Lists IS-IS adjacencies, level and state (FRRouting)" } },
      { command: "vtysh -c \"show isis database\"", description: { es: "Muestra los LSP de la base de datos por nivel", en: "Shows the LSPs in the database per level" } },
    ],
    wireshark: "isis",
    relations: { dependsOn: ["ethernet"], replaces: ["rip"] },
    specs: [
      { id: "ISO/IEC 10589:2002", title: { es: "Protocolo de enrutamiento intradominio IS-IS", en: "Intermediate System to Intermediate System intra-domain routeing information exchange protocol" } },
      { id: "RFC 1195", title: { es: "Uso de OSI IS-IS para enrutar en entornos TCP/IP y duales", en: "Use of OSI IS-IS for Routing in TCP/IP and Dual Environments" }, url: rfc(1195) },
      { id: "RFC 5308", title: { es: "Enrutamiento IPv6 con IS-IS", en: "Routing IPv6 with IS-IS" }, url: rfc(5308) },
      { id: "RFC 5305", title: { es: "Extensiones de IS-IS para ingeniería de tráfico", en: "IS-IS Extensions for Traffic Engineering" }, url: rfc(5305) },
    ],
  },
  {
    id: "nat",
    acronym: "NAT",
    fullName: { es: "Traducción de Direcciones de Red", en: "Network Address Translation" },
    osi: [3],
    category: "translation",
    status: "current",
    bodies: ["IETF"],
    year: 1994,
    summary: {
      es: "NAT permite que muchos dispositivos de una red privada compartan una sola dirección IP pública: el router cambia las direcciones de los paquetes al salir y al volver. Es lo que hace que todos los equipos de tu casa naveguen con una sola IP.",
      en: "NAT lets many devices on a private network share a single public IP address: the router rewrites packet addresses on the way out and on the way back. It is why every device in your home browses with a single IP.",
    },
    analogy: {
      es: "Como el conmutador de una empresa: desde fuera solo se ve un número telefónico, y la recepcionista anota qué extensión hizo cada llamada para pasarle la respuesta a la persona correcta.",
      en: "Like a company switchboard: from outside there is only one phone number, and the receptionist notes which extension made each call so the answer goes to the right person.",
    },
    everyday: {
      es: "El router de tu casa hace NAT siempre; muchos proveedores móviles aplican además un segundo nivel (CGNAT).",
      en: "Your home router always does NAT; many mobile providers add a second level on top (CGNAT).",
    },
    technical: [
      {
        es: "NAT no es un protocolo de red con su propio formato en el cable, sino una función de un router o firewall que reescribe las cabeceras IP (y, en NAPT, los puertos TCP/UDP o el identificador ICMP) y mantiene una tabla de traducciones. La forma más común es NAPT o PAT (RFC 3022, \"Traditional NAT\"): muchas direcciones privadas salen por una sola pública, diferenciadas por el puerto de origen; RFC 2663 fija la terminología y RFC 1631 (1994) fue la primera descripción.",
        en: "NAT is not a network protocol with its own wire format but a function of a router or firewall that rewrites IP headers (and, in NAPT, TCP/UDP ports or the ICMP identifier) and keeps a translation table. The most common form is NAPT or PAT (RFC 3022, \"Traditional NAT\"): many private addresses leave through one public address, told apart by source port; RFC 2663 sets the terminology and RFC 1631 (1994) was the first description.",
      },
      {
        es: "Como las conexiones entrantes no tienen entrada en la tabla, NAT rompe el modelo extremo a extremo: servidores domésticos, llamadas VoIP o juegos P2P necesitan reenvío de puertos o técnicas de travesía como STUN, TURN e ICE. RFC 4787 define los comportamientos deseables para UDP, como el mapeo independiente del destino (endpoint-independent mapping) y el hairpinning. Protocolos que llevan direcciones IP dentro del payload, como FTP o SIP, requieren ALG.",
        en: "Because inbound connections have no table entry, NAT breaks the end-to-end model: home servers, VoIP calls or P2P games need port forwarding or traversal techniques such as STUN, TURN and ICE. RFC 4787 defines desirable UDP behaviors, such as endpoint-independent mapping and hairpinning. Protocols that carry IP addresses inside the payload, such as FTP or SIP, need ALGs.",
      },
      {
        es: "El NAT de grado operador (CGNAT o NAT444) usa el espacio compartido 100.64.0.0/10 (RFC 6598) entre el cliente y el proveedor para ahorrar IPv4 públicas. NAT64 (RFC 6146), junto con DNS64, permite que clientes solo IPv6 lleguen a servidores solo IPv4 traduciendo entre ambas familias con el prefijo 64:ff9b::/96.",
        en: "Carrier-grade NAT (CGNAT or NAT444) uses the shared address space 100.64.0.0/10 (RFC 6598) between customer and provider to save public IPv4 addresses. NAT64 (RFC 6146), together with DNS64, lets IPv6-only clients reach IPv4-only servers by translating between the two families using the 64:ff9b::/96 prefix.",
      },
    ],
    howItWorks: [
      { es: "Un equipo 192.168.1.10:51000 envía un paquete hacia 93.184.216.34:443.", en: "A host at 192.168.1.10:51000 sends a packet to 93.184.216.34:443." },
      { es: "El router sustituye el origen por su IP pública y un puerto libre (por ejemplo, 203.0.113.5:62001) y registra el mapeo.", en: "The router replaces the source with its public IP and a free port (e.g. 203.0.113.5:62001) and records the mapping." },
      { es: "La respuesta llega a 203.0.113.5:62001; el router busca el mapeo y reescribe el destino a 192.168.1.10:51000.", en: "The reply arrives at 203.0.113.5:62001; the router looks up the mapping and rewrites the destination to 192.168.1.10:51000." },
      { es: "Tras un periodo de inactividad, la entrada expira y el puerto queda libre.", en: "After a period of inactivity the entry expires and the port is freed." },
    ],
    facts: [
      { label: { es: "Naturaleza", en: "Nature" }, value: { es: "Función de router, no protocolo de cable", en: "Router function, not a wire protocol" } },
      { label: { es: "Forma más común", en: "Most common form" }, value: { es: "NAPT / PAT (IP + puerto)", en: "NAPT / PAT (IP + port)" } },
      { label: { es: "CGNAT", en: "CGNAT" }, value: "100.64.0.0/10 (RFC 6598)" },
      { label: { es: "NAT64", en: "NAT64" }, value: { es: "IPv6 → IPv4, prefijo 64:ff9b::/96", en: "IPv6 → IPv4, prefix 64:ff9b::/96" } },
      { label: { es: "Efecto secundario", en: "Side effect" }, value: { es: "Rompe la conectividad extremo a extremo", en: "Breaks end-to-end connectivity" } },
    ],
    security: {
      es: "NAT bloquea de hecho las conexiones entrantes no solicitadas, pero no es un firewall: no inspecciona tráfico y se puede eludir con UPnP o reenvíos mal configurados. Con CGNAT, muchos clientes comparten una IP, lo que complica la atribución de abusos y obliga al proveedor a registrar IP y puerto. Rompe AH de IPsec, que autentica las direcciones.",
      en: "NAT does block unsolicited inbound connections in practice, but it is not a firewall: it does not inspect traffic and can be bypassed through UPnP or misconfigured port forwards. With CGNAT many customers share one IP, which complicates abuse attribution and forces providers to log IP and port. It breaks IPsec AH, which authenticates addresses.",
    },
    tools: [
      { command: "conntrack -L", description: { es: "Lista la tabla de conexiones y traducciones NAT del kernel Linux", en: "Lists the Linux kernel connection and NAT translation table" } },
      { command: "nft list ruleset", description: { es: "Muestra las reglas de masquerade/SNAT/DNAT en nftables", en: "Shows masquerade/SNAT/DNAT rules in nftables" } },
      { command: "curl https://ifconfig.me", description: { es: "Muestra la IP pública con la que sales tras el NAT", en: "Shows the public IP you appear as behind NAT" } },
    ],
    relations: { dependsOn: ["ipv4", "ipv6", "tcp", "udp", "icmp"] },
    specs: [
      { id: "RFC 3022", title: { es: "Traductor de direcciones de red IP tradicional", en: "Traditional IP Network Address Translator (Traditional NAT)" }, url: rfc(3022) },
      { id: "RFC 2663", title: { es: "Terminología y consideraciones del NAT IP", en: "IP Network Address Translator (NAT) Terminology and Considerations" }, url: rfc(2663) },
      { id: "RFC 4787", title: { es: "Requisitos de comportamiento de NAT para UDP", en: "Network Address Translation (NAT) Behavioral Requirements for Unicast UDP" }, url: rfc(4787) },
      { id: "RFC 6598", title: { es: "Prefijo IPv4 reservado para espacio compartido", en: "IANA-Reserved IPv4 Prefix for Shared Address Space" }, url: rfc(6598) },
      { id: "RFC 6146", title: { es: "NAT64 con estado", en: "Stateful NAT64: Network Address and Protocol Translation from IPv6 Clients to IPv4 Servers" }, url: rfc(6146) },
    ],
  },
  {
    id: "gre",
    acronym: "GRE",
    fullName: { es: "Encapsulación Genérica de Enrutamiento", en: "Generic Routing Encapsulation" },
    osi: [3],
    category: "tunneling",
    status: "current",
    bodies: ["IETF"],
    year: 1994,
    identifiers: ["IP protocol 47"],
    summary: {
      es: "GRE crea un túnel que mete un paquete dentro de otro para llevarlo a través de una red intermedia, como si los dos extremos estuvieran conectados por un cable directo. Es simple y versátil, pero no cifra nada.",
      en: "GRE creates a tunnel that puts one packet inside another to carry it across an intermediate network, as if both ends were joined by a direct cable. It is simple and versatile, but encrypts nothing.",
    },
    analogy: {
      es: "Como meter un sobre dentro de otro más grande con otra dirección: el cartero solo mira el sobre exterior, y al llegar se saca el interior para seguir su camino.",
      en: "Like putting an envelope inside a bigger one with a different address: the mail carrier only reads the outer envelope, and on arrival the inner one is taken out to continue its trip.",
    },
    everyday: {
      es: "Túneles entre sucursales que necesitan pasar protocolos de enrutamiento o multicast, normalmente cifrados con IPsec.",
      en: "Tunnels between branch offices that must carry routing protocols or multicast, usually encrypted with IPsec.",
    },
    technical: [
      {
        es: "GRE (RFC 2784) añade una cabecera mínima de 4 bytes entre la cabecera IP externa (protocolo 47) y el paquete encapsulado. Su campo Protocol Type usa valores EtherType para indicar qué se transporta (0x0800 IPv4, 0x86DD IPv6, entre otros), por lo que puede llevar prácticamente cualquier protocolo de capa 3 e incluso tramas Ethernet. RFC 2890 añade los campos opcionales Key (para distinguir túneles o flujos) y Sequence Number.",
        en: "GRE (RFC 2784) adds a minimal 4-byte header between the outer IP header (protocol 47) and the encapsulated packet. Its Protocol Type field uses EtherType values to indicate what is carried (0x0800 IPv4, 0x86DD IPv6, among others), so it can carry virtually any layer-3 protocol and even Ethernet frames. RFC 2890 adds the optional Key (to tell tunnels or flows apart) and Sequence Number fields.",
      },
      {
        es: "Como el túnel es una interfaz punto a punto que admite multicast, permite ejecutar OSPF o EIGRP entre sitios separados por Internet, algo que IPsec en modo túnel por sí solo no ofrece de forma sencilla. Por eso es habitual la combinación GRE sobre IPsec. La primera descripción fue RFC 1701 (1994), y variantes como la GRE mejorada de PPTP o NVGRE reutilizan su formato.",
        en: "Because the tunnel is a point-to-point interface that supports multicast, it lets OSPF or EIGRP run between sites separated by the Internet, something IPsec tunnel mode alone does not easily offer. That is why GRE over IPsec is a common combination. The first description was RFC 1701 (1994), and variants such as PPTP's enhanced GRE or NVGRE reuse its format.",
      },
      {
        es: "GRE no tiene estado ni mecanismo de keepalive estándar, y su encapsulación consume al menos 24 bytes sobre IPv4 (20 de IP + 4 de GRE), lo que reduce la MTU efectiva y obliga a ajustar MTU o MSS para evitar fragmentación.",
        en: "GRE is stateless with no standard keepalive, and its encapsulation costs at least 24 bytes over IPv4 (20 IP + 4 GRE), which lowers the effective MTU and requires MTU or MSS adjustments to avoid fragmentation.",
      },
    ],
    facts: [
      { label: { es: "Protocolo IP", en: "IP protocol" }, value: "47" },
      { label: { es: "Cabecera", en: "Header" }, value: { es: "4 B mínimo (hasta 16 B con checksum, key y secuencia)", en: "4 B minimum (up to 16 B with checksum, key and sequence)" } },
      { label: { es: "Sobrecosto sobre IPv4", en: "Overhead over IPv4" }, value: { es: "24 B como mínimo", en: "24 B minimum" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "No; se combina con IPsec", en: "No; combined with IPsec" } },
      { label: { es: "Multicast", en: "Multicast" }, value: { es: "Sí, permite protocolos de enrutamiento", en: "Yes, allows routing protocols" } },
    ],
    security: {
      es: "GRE no cifra ni autentica: el tráfico viaja en claro y cualquiera que pueda enviar paquetes con protocolo 47 a un extremo podría inyectar tráfico en el túnel. Debe protegerse con IPsec y con filtros que solo acepten GRE de los extremos conocidos.",
      en: "GRE neither encrypts nor authenticates: traffic travels in the clear and anyone able to send protocol-47 packets to an endpoint could inject traffic into the tunnel. It should be protected with IPsec and with filters accepting GRE only from known endpoints.",
    },
    tools: [
      { command: "ip tunnel add gre1 mode gre local 198.51.100.1 remote 203.0.113.1", description: { es: "Crea una interfaz de túnel GRE en Linux", en: "Creates a GRE tunnel interface on Linux" } },
      { command: "ip -d link show gre1", description: { es: "Muestra los detalles del túnel (extremos, key, TTL)", en: "Shows tunnel details (endpoints, key, TTL)" } },
    ],
    wireshark: "gre",
    relations: { dependsOn: ["ipv4", "ipv6"], usedBy: ["pptp", "ospf", "eigrp"] },
    specs: [
      { id: "RFC 2784", title: { es: "Generic Routing Encapsulation (GRE)", en: "Generic Routing Encapsulation (GRE)" }, url: rfc(2784) },
      { id: "RFC 2890", title: { es: "Extensiones Key y Sequence Number para GRE", en: "Key and Sequence Number Extensions to GRE" }, url: rfc(2890) },
    ],
  },
  {
    id: "mpls",
    acronym: "MPLS",
    fullName: { es: "Conmutación de Etiquetas Multiprotocolo", en: "Multiprotocol Label Switching" },
    osi: [3, 2],
    category: "tunneling",
    status: "current",
    bodies: ["IETF"],
    year: 2001,
    identifiers: ["EtherType 0x8847"],
    summary: {
      es: "MPLS hace que los paquetes dentro de la red de un operador se reenvíen mirando una etiqueta corta en lugar de la dirección IP completa. Así el operador puede crear rutas predefinidas, VPN para empresas y controlar por dónde va cada tipo de tráfico.",
      en: "MPLS makes packets inside a carrier's network get forwarded by looking at a short label instead of the full IP address. This lets the carrier build predefined paths, business VPNs and control where each type of traffic goes.",
    },
    analogy: {
      es: "Como las etiquetas de equipaje en un aeropuerto: al documentar te ponen un código y, en cada conexión, los empleados solo leen ese código para mandar la maleta a la siguiente banda, sin abrirla ni leer la dirección de tu casa.",
      en: "Like airport baggage tags: at check-in the bag gets a code, and at every connection staff only read that code to send it to the next belt, without opening it or reading your home address.",
    },
    everyday: {
      es: "Las VPN MPLS que los operadores venden a empresas para interconectar sucursales, y el núcleo de muchas redes de proveedores.",
      en: "The MPLS VPNs carriers sell to businesses to interconnect branches, and the core of many provider networks.",
    },
    technical: [
      {
        es: "La arquitectura (RFC 3031) asigna los paquetes a una clase de equivalencia de reenvío (FEC) en el borde de la red: el router de borde (LER) empuja (push) una etiqueta, los routers del núcleo (LSR) la intercambian (swap) según su tabla, y el último la retira (pop). El camino resultante se llama LSP. Con frecuencia el penúltimo salto retira la etiqueta (PHP, anunciada con la etiqueta 3, Implicit NULL) para ahorrar una búsqueda al router de salida.",
        en: "The architecture (RFC 3031) assigns packets to a Forwarding Equivalence Class (FEC) at the network edge: the edge router (LER) pushes a label, core routers (LSRs) swap it according to their table, and the last one pops it. The resulting path is called an LSP. Often the penultimate hop pops the label (PHP, signalled with label 3, Implicit NULL) to save the egress router a lookup.",
      },
      {
        es: "Cada entrada de la pila de etiquetas (RFC 3032) ocupa 32 bits: etiqueta de 20 bits, Traffic Class de 3 bits (antes EXP, renombrado en RFC 5462), bit S de fondo de pila y TTL de 8 bits. Las etiquetas 0–15 están reservadas. Se pueden apilar varias: por ejemplo, una exterior para el transporte y una interior para identificar la VPN del cliente en las L3VPN BGP/MPLS (RFC 4364).",
        en: "Each label stack entry (RFC 3032) is 32 bits: a 20-bit label, 3-bit Traffic Class (formerly EXP, renamed in RFC 5462), a bottom-of-stack S bit and an 8-bit TTL. Labels 0–15 are reserved. Several can be stacked: for example, an outer one for transport and an inner one identifying the customer VPN in BGP/MPLS L3VPNs (RFC 4364).",
      },
      {
        es: "Las etiquetas se distribuyen con LDP (RFC 5036), con RSVP-TE (RFC 3209) para ingeniería de tráfico o, cada vez más, con Segment Routing (RFC 8660), que las anuncia mediante el IGP (IS-IS u OSPF). Sobre Ethernet, MPLS unicast se identifica con EtherType 0x8847.",
        en: "Labels are distributed with LDP (RFC 5036), with RSVP-TE (RFC 3209) for traffic engineering or, increasingly, with Segment Routing (RFC 8660), which advertises them through the IGP (IS-IS or OSPF). Over Ethernet, unicast MPLS is identified by EtherType 0x8847.",
      },
    ],
    howItWorks: [
      { es: "El LER de entrada clasifica el paquete IP en una FEC y empuja la etiqueta correspondiente.", en: "The ingress LER classifies the IP packet into a FEC and pushes the matching label." },
      { es: "Cada LSR mira solo la etiqueta superior, la intercambia por la de salida y decrementa el TTL de MPLS.", en: "Each LSR looks only at the top label, swaps it for the outgoing one and decrements the MPLS TTL." },
      { es: "El penúltimo salto retira la etiqueta de transporte (PHP) si el egreso así lo pidió.", en: "The penultimate hop pops the transport label (PHP) if the egress requested it." },
      { es: "El LER de salida retira las etiquetas restantes y reenvía el paquete original por IP o hacia la VPN del cliente.", en: "The egress LER pops the remaining labels and forwards the original packet via IP or into the customer VPN." },
    ],
    facts: [
      { label: { es: "Entrada de etiqueta", en: "Label entry" }, value: { es: "32 bits: etiqueta 20, TC 3, S 1, TTL 8", en: "32 bits: label 20, TC 3, S 1, TTL 8" } },
      { label: { es: "EtherType", en: "EtherType" }, value: { es: "0x8847 (unicast)", en: "0x8847 (unicast)" } },
      { label: { es: "Etiquetas reservadas", en: "Reserved labels" }, value: "0–15" },
      { label: { es: "Distribución de etiquetas", en: "Label distribution" }, value: "LDP, RSVP-TE, Segment Routing" },
      { label: { es: "Servicios típicos", en: "Typical services" }, value: { es: "L3VPN, L2VPN, ingeniería de tráfico", en: "L3VPN, L2VPN, traffic engineering" } },
    ],
    security: {
      es: "MPLS separa el tráfico de los clientes, pero no lo cifra: una VPN MPLS confía en la integridad de la red del operador. El núcleo no debe aceptar paquetes etiquetados desde interfaces de clientes, porque una etiqueta inyectada podría meter tráfico en la VPN de otro cliente. Si se necesita confidencialidad, se añade IPsec o MACsec.",
      en: "MPLS separates customer traffic but does not encrypt it: an MPLS VPN trusts the integrity of the carrier's network. The core must not accept labelled packets from customer-facing interfaces, because an injected label could push traffic into another customer's VPN. If confidentiality is needed, IPsec or MACsec is added.",
    },
    multiLayerNote: {
      es: "MPLS suele llamarse \"capa 2.5\": su cabecera va entre la trama de enlace (L2) y el paquete IP (L3). Reenvía como un conmutador, por etiqueta y sin mirar la IP, pero las etiquetas se asignan según rutas de capa 3 y puede transportar tanto paquetes IP como tramas de L2.",
      en: "MPLS is often called \"layer 2.5\": its header sits between the link-layer frame (L2) and the IP packet (L3). It forwards like a switch, by label and without looking at the IP, yet labels are assigned from layer-3 routes and it can carry both IP packets and L2 frames.",
    },
    tools: [
      { command: "vtysh -c \"show mpls table\"", description: { es: "Muestra la tabla de etiquetas (LFIB) en FRRouting", en: "Shows the label table (LFIB) in FRRouting" } },
      { command: "ip -f mpls route show", description: { es: "Rutas MPLS instaladas en el kernel Linux", en: "MPLS routes installed in the Linux kernel" } },
      { command: "traceroute -e example.com", description: { es: "Muestra las etiquetas MPLS de cada salto a partir de extensiones ICMP (RFC 4950)", en: "Shows each hop's MPLS labels from ICMP extensions (RFC 4950)" } },
    ],
    wireshark: "mpls",
    relations: { dependsOn: ["ethernet", "ppp"], replaces: ["frame-relay", "atm"] },
    specs: [
      { id: "RFC 3031", title: { es: "Arquitectura de MPLS", en: "Multiprotocol Label Switching Architecture" }, url: rfc(3031) },
      { id: "RFC 3032", title: { es: "Codificación de la pila de etiquetas MPLS", en: "MPLS Label Stack Encoding" }, url: rfc(3032) },
      { id: "RFC 5036", title: { es: "Especificación de LDP", en: "LDP Specification" }, url: rfc(5036) },
      { id: "RFC 4364", title: { es: "VPN IP BGP/MPLS", en: "BGP/MPLS IP Virtual Private Networks (VPNs)" }, url: rfc(4364) },
    ],
  },
];
