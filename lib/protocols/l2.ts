import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L2_PROTOCOLS: Protocol[] = [
  {
    id: "ethernet",
    acronym: "Ethernet",
    fullName: { es: "Ethernet (Ethernet II / IEEE 802.3)", en: "Ethernet (Ethernet II / IEEE 802.3)" },
    osi: [2],
    category: "framing",
    status: "current",
    bodies: ["IEEE"],
    year: 1980,
    identifiers: ["EtherType ≥ 0x0600", "MAC 48 bits (OUI 24 bits)"],
    summary: {
      es: "Ethernet es la tecnología que usan casi todas las redes cableadas para mover datos entre equipos del mismo segmento. Empaqueta la información en tramas con la dirección física (MAC) de origen y destino y un código para detectar errores.",
      en: "Ethernet is the technology almost every wired network uses to move data between devices on the same segment. It packs information into frames carrying the source and destination physical (MAC) addresses and a code to detect errors.",
    },
    analogy: {
      es: "Como un sobre interno de oficina: lleva el nombre de quien lo envía y de quien lo recibe dentro del mismo edificio, y un sello que revela si alguien lo dañó en el camino.",
      en: "Like an inter-office envelope: it carries the sender's and recipient's names within the same building, plus a seal that shows whether it was damaged on the way.",
    },
    everyday: {
      es: "Cuando conectas una PC o una consola al router con un cable de red, o cuando un centro de datos une miles de servidores.",
      en: "When you plug a PC or a console into the router with a network cable, or when a data center links thousands of servers.",
    },
    technical: [
      {
        es: "La trama Ethernet II lleva MAC destino (6 B), MAC origen (6 B), EtherType (2 B), payload de 46 a 1500 B y un FCS de 4 B calculado con CRC-32. El preámbulo de 7 B y el delimitador SFD de 1 B los añade la capa física. Así, una trama mide entre 64 y 1518 B (1522 B con una etiqueta 802.1Q); si el payload es menor a 46 B se rellena con padding.",
        en: "An Ethernet II frame carries destination MAC (6 B), source MAC (6 B), EtherType (2 B), a 46–1500 B payload and a 4 B FCS computed with CRC-32. The 7 B preamble and 1 B start frame delimiter (SFD) are added by the physical layer. A frame is therefore 64 to 1518 B long (1522 B with an 802.1Q tag); payloads under 46 B are padded.",
      },
      {
        es: "El campo de 2 B tras las direcciones tiene doble interpretación: un valor ≥ 0x0600 (1536) es un EtherType que identifica el protocolo transportado (0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP), mientras que un valor ≤ 1500 es la longitud de una trama IEEE 802.3, seguida de una cabecera LLC 802.2. Ethernet II nació con el estándar DIX de DEC, Intel y Xerox (1980, versión 2 en 1982) y el IEEE lo publicó como 802.3 en 1983; la edición vigente es IEEE 802.3-2022.",
        en: "The 2 B field after the addresses has a dual meaning: a value ≥ 0x0600 (1536) is an EtherType identifying the carried protocol (0x0800 IPv4, 0x86DD IPv6, 0x0806 ARP), whereas a value ≤ 1500 is the length of an IEEE 802.3 frame, followed by an 802.2 LLC header. Ethernet II originated in the DIX standard from DEC, Intel and Xerox (1980, version 2 in 1982), and the IEEE published it as 802.3 in 1983; the current edition is IEEE 802.3-2022.",
      },
      {
        es: "Una dirección MAC tiene 48 bits: los primeros 24 son el OUI que la IEEE asigna a cada fabricante. El bit menos significativo del primer octeto distingue unicast de multicast (I/G) y el siguiente marca si la dirección es administrada localmente (U/L), como las MAC aleatorias de los teléfonos. El tamaño mínimo de 64 B viene del CSMA/CD de half-duplex, que necesitaba 512 bits para detectar colisiones; los switches actuales en full-duplex ya no tienen colisiones.",
        en: "A MAC address is 48 bits: the first 24 are the OUI the IEEE assigns to each vendor. The least significant bit of the first octet distinguishes unicast from multicast (I/G) and the next one marks a locally administered address (U/L), such as the random MACs used by phones. The 64 B minimum comes from half-duplex CSMA/CD, which needed 512 bits to detect collisions; today's full-duplex switches have no collisions at all.",
      },
    ],
    howItWorks: [
      { es: "El emisor arma la trama con la MAC destino (obtenida por ARP o NDP), su MAC y el EtherType.", en: "The sender builds the frame with the destination MAC (learned via ARP or NDP), its own MAC and the EtherType." },
      { es: "Calcula el CRC-32 sobre la trama y lo añade como FCS; la capa física antepone preámbulo y SFD.", en: "It computes the CRC-32 over the frame and appends it as the FCS; the physical layer prepends preamble and SFD." },
      { es: "El switch aprende la MAC origen en su tabla (CAM) y reenvía la trama solo por el puerto del destino; si no lo conoce, la inunda.", en: "The switch learns the source MAC into its table (CAM) and forwards the frame only out of the destination port; if unknown, it floods it." },
      { es: "El receptor verifica el FCS, descarta la trama si está corrupta y entrega el payload según el EtherType.", en: "The receiver checks the FCS, drops the frame if corrupt, and hands the payload up according to the EtherType." },
    ],
    facts: [
      { label: { es: "Tamaño de trama", en: "Frame size" }, value: { es: "64–1518 B (1522 B con 802.1Q)", en: "64–1518 B (1522 B with 802.1Q)" } },
      { label: { es: "MTU estándar", en: "Standard MTU" }, value: "1500 B" },
      { label: { es: "Dirección", en: "Address" }, value: { es: "MAC de 48 bits (OUI + 24 bits del fabricante)", en: "48-bit MAC (OUI + 24 vendor bits)" } },
      { label: { es: "Detección de errores", en: "Error detection" }, value: { es: "FCS CRC-32 (sin corrección ni retransmisión)", en: "CRC-32 FCS (no correction or retransmission)" } },
      { label: { es: "Separación entre tramas", en: "Interframe gap" }, value: { es: "96 tiempos de bit", en: "96 bit times" } },
    ],
    security: {
      es: "Ethernet no autentica ni cifra. Un atacante puede falsificar su MAC o inundar la tabla CAM del switch con MAC falsas para que este reenvíe todo como un hub (MAC flooding); se mitiga con port security y 802.1X. La confidencialidad en el enlace se logra con MACsec (802.1AE).",
      en: "Ethernet neither authenticates nor encrypts. An attacker can spoof its MAC or flood the switch's CAM table with fake MACs so it forwards everything like a hub (MAC flooding); port security and 802.1X mitigate this. Link-level confidentiality comes from MACsec (802.1AE).",
    },
    tools: [
      { command: "ip link show", description: { es: "Muestra las interfaces, su MAC y su MTU", en: "Shows interfaces, their MAC and MTU" } },
      { command: "ethtool eth0", description: { es: "Velocidad, dúplex y autonegociación del enlace", en: "Link speed, duplex and autonegotiation" } },
      { command: "tcpdump -e -n -i eth0", description: { es: "Captura mostrando las MAC y el EtherType de cada trama", en: "Captures showing each frame's MACs and EtherType" } },
    ],
    wireshark: "eth",
    relations: {
      dependsOn: ["100base-tx", "1000base-t", "10gbase-t", "ethernet-fiber"],
      usedBy: ["ipv4", "ipv6", "arp", "vlan-8021q", "pppoe", "lldp", "lacp", "macsec"],
    },
    specs: [
      { id: "IEEE 802.3-2022", title: { es: "Estándar IEEE para Ethernet", en: "IEEE Standard for Ethernet" } },
      { id: "IEEE 802-2014", title: { es: "Redes de área local y metropolitana: visión general y arquitectura", en: "Local and Metropolitan Area Networks: Overview and Architecture" } },
    ],
  },
  {
    id: "vlan-8021q",
    acronym: "802.1Q",
    fullName: { es: "Redes de área local virtuales (VLAN) IEEE 802.1Q", en: "IEEE 802.1Q Virtual LANs (VLAN)" },
    osi: [2],
    category: "switching",
    status: "current",
    bodies: ["IEEE"],
    year: 1998,
    identifiers: ["TPID 0x8100", "TPID 0x88A8 (802.1ad)"],
    summary: {
      es: "Las VLAN dividen un mismo switch físico en varias redes lógicas aisladas, por ejemplo una para empleados, otra para invitados y otra para cámaras. 802.1Q es el estándar que marca cada trama con el número de VLAN al que pertenece.",
      en: "VLANs split one physical switch into several isolated logical networks, for example one for staff, one for guests and one for cameras. 802.1Q is the standard that tags each frame with the number of the VLAN it belongs to.",
    },
    analogy: {
      es: "Como un edificio con pisos de distintas empresas que comparten elevador: cada visitante lleva un gafete de color y solo puede bajar en el piso que corresponde a su color.",
      en: "Like a building shared by several companies on one elevator: each visitor wears a colored badge and can only get off on the floor matching that color.",
    },
    everyday: {
      es: "La red de invitados de una oficina, la separación de telefonía IP y datos, o la VLAN de TV que usa tu proveedor de fibra.",
      en: "An office guest network, keeping IP phones apart from data, or the TV VLAN your fiber provider uses.",
    },
    technical: [
      {
        es: "802.1Q inserta una etiqueta de 4 B entre la MAC origen y el EtherType: un TPID de 16 bits con valor 0x8100 y un TCI con PCP (3 bits de prioridad, definidos originalmente en 802.1p), DEI (1 bit, antes CFI, que marca tramas descartables) y VID (12 bits). Los VID 0 y 4095 están reservados, así que quedan 4094 VLAN utilizables. La trama máxima crece de 1518 a 1522 B.",
        en: "802.1Q inserts a 4 B tag between the source MAC and the EtherType: a 16-bit TPID set to 0x8100 and a TCI with PCP (3 priority bits, originally defined in 802.1p), DEI (1 bit, formerly CFI, marking drop-eligible frames) and VID (12 bits). VIDs 0 and 4095 are reserved, leaving 4094 usable VLANs. The maximum frame grows from 1518 to 1522 B.",
      },
      {
        es: "Un puerto de acceso pertenece a una sola VLAN y envía tramas sin etiqueta a los equipos finales; un puerto troncal transporta varias VLAN etiquetadas entre switches, y la VLAN nativa viaja sin etiqueta. Cada VLAN es un dominio de broadcast independiente, por lo que comunicar dos VLAN requiere un router o un switch de capa 3.",
        en: "An access port belongs to a single VLAN and sends untagged frames to end devices; a trunk port carries several tagged VLANs between switches, and the native VLAN travels untagged. Each VLAN is a separate broadcast domain, so connecting two VLANs requires a router or a layer 3 switch.",
      },
      {
        es: "IEEE 802.1ad (Q-in-Q, 2005) apila una etiqueta de proveedor (S-tag, TPID 0x88A8) sobre la del cliente (C-tag, 0x8100) para que un operador transporte las VLAN de muchos clientes. El estándar se publicó en 1998 y hoy IEEE 802.1Q-2022 integra también el puenteo, RSTP/MSTP y 802.1ad.",
        en: "IEEE 802.1ad (Q-in-Q, 2005) stacks a provider tag (S-tag, TPID 0x88A8) over the customer tag (C-tag, 0x8100) so a carrier can transport many customers' VLANs. The standard was published in 1998, and today IEEE 802.1Q-2022 also folds in bridging, RSTP/MSTP and 802.1ad.",
      },
    ],
    facts: [
      { label: { es: "Tamaño de la etiqueta", en: "Tag size" }, value: "4 B" },
      { label: { es: "VLAN utilizables", en: "Usable VLANs" }, value: { es: "4094 (VID 1–4094)", en: "4094 (VID 1–4094)" } },
      { label: { es: "Prioridad", en: "Priority" }, value: { es: "PCP de 3 bits (0–7, 802.1p)", en: "3-bit PCP (0–7, 802.1p)" } },
      { label: { es: "Trama máxima", en: "Maximum frame" }, value: "1522 B" },
      { label: { es: "Doble etiqueta", en: "Double tagging" }, value: { es: "802.1ad Q-in-Q (TPID 0x88A8)", en: "802.1ad Q-in-Q (TPID 0x88A8)" } },
    ],
    security: {
      es: "El VLAN hopping permite saltar a otra VLAN de dos formas: con doble etiqueta, abusando de la VLAN nativa, o haciéndose pasar por un switch para negociar un troncal (DTP en Cisco). Se mitiga desactivando la negociación automática de troncales, usando una VLAN nativa sin uso y configurando los puertos de usuario como acceso.",
      en: "VLAN hopping lets an attacker jump to another VLAN in two ways: double tagging that abuses the native VLAN, or impersonating a switch to negotiate a trunk (DTP on Cisco). Mitigations are disabling automatic trunk negotiation, using an unused native VLAN and configuring user ports as access ports.",
    },
    tools: [
      { command: "bridge vlan show", description: { es: "VLAN asignadas a cada puerto de un bridge Linux", en: "VLANs assigned to each port of a Linux bridge" } },
      { command: "ip link add link eth0 name eth0.10 type vlan id 10", description: { es: "Crea una subinterfaz etiquetada con la VLAN 10", en: "Creates a subinterface tagged with VLAN 10" } },
      { command: "show vlan brief", description: { es: "Resumen de VLAN y puertos en Cisco IOS", en: "VLAN and port summary on Cisco IOS" } },
    ],
    wireshark: "vlan.id == 10",
    relations: { dependsOn: ["ethernet"], usedBy: ["stp"] },
    specs: [
      { id: "IEEE 802.1Q-2022", title: { es: "Puentes y redes con puentes", en: "Bridges and Bridged Networks" } },
      { id: "IEEE 802.1ad-2005", title: { es: "Puentes de proveedor (Q-in-Q)", en: "Provider Bridges (Q-in-Q)" } },
    ],
  },
  {
    id: "stp",
    acronym: "STP",
    fullName: { es: "Protocolo de Árbol de Expansión (STP, RSTP, MSTP)", en: "Spanning Tree Protocol (STP, RSTP, MSTP)" },
    osi: [2],
    category: "switching",
    status: "current",
    bodies: ["IEEE"],
    year: 1990,
    identifiers: ["MAC 01:80:C2:00:00:00", "LLC SAP 0x42"],
    summary: {
      es: "STP evita que los bucles entre switches colapsen la red. Si hay cables redundantes, bloquea algunos puertos para que solo exista un camino activo, y los reactiva automáticamente si el camino principal falla.",
      en: "STP keeps loops between switches from bringing the network down. When there are redundant cables, it blocks some ports so only one active path exists, and reactivates them automatically if the main path fails.",
    },
    analogy: {
      es: "Como cerrar algunas calles de una colonia para que el tráfico no dé vueltas en círculo, pero dejarlas listas para abrirlas si la avenida principal se bloquea.",
      en: "Like closing some streets in a neighborhood so traffic never drives in circles, while keeping them ready to open if the main avenue gets blocked.",
    },
    everyday: {
      es: "Corre en los switches de casi cualquier empresa; su efecto visible es que un puerto recién conectado puede tardar unos segundos en dar servicio.",
      en: "It runs on the switches of almost every business; its visible effect is that a freshly connected port may take a few seconds to start working.",
    },
    technical: [
      {
        es: "Ethernet no tiene TTL, así que un bucle genera tormentas de broadcast que saturan la red en segundos. STP (IEEE 802.1D, 1990, basado en el algoritmo de Radia Perlman) elige un root bridge, el de menor Bridge ID (prioridad, 32768 por defecto, más MAC), y cada switch conserva solo su puerto de menor costo hacia la raíz. Por cada segmento hay un puerto designado y los demás quedan bloqueados.",
        en: "Ethernet has no TTL, so a loop creates broadcast storms that saturate the network in seconds. STP (IEEE 802.1D, 1990, based on Radia Perlman's algorithm) elects a root bridge, the one with the lowest Bridge ID (priority, 32768 by default, plus MAC), and each switch keeps only its lowest-cost port toward the root. Each segment gets one designated port and the rest are blocked.",
      },
      {
        es: "La información viaja en BPDU enviadas cada 2 s (hello) a la MAC multicast 01:80:C2:00:00:00. Los puertos pasan por los estados blocking, listening, learning y forwarding; con los temporizadores por defecto (max age 20 s, forward delay 15 s) la convergencia tarda de 30 a 50 s.",
        en: "Information travels in BPDUs sent every 2 s (hello) to the multicast MAC 01:80:C2:00:00:00. Ports move through the blocking, listening, learning and forwarding states; with default timers (max age 20 s, forward delay 15 s) convergence takes 30 to 50 s.",
      },
      {
        es: "RSTP (802.1w, 2001) reduce la convergencia a menos de un segundo en enlaces punto a punto mediante un mecanismo de propuesta y acuerdo, con puertos alternate y backup precalculados y puertos edge para los equipos finales. MSTP (802.1s, 2002) asigna grupos de VLAN a varias instancias de árbol para aprovechar los enlaces redundantes. Hoy RSTP y MSTP forman parte de IEEE 802.1Q.",
        en: "RSTP (802.1w, 2001) cuts convergence to under a second on point-to-point links through a proposal/agreement handshake, with precomputed alternate and backup ports and edge ports for end devices. MSTP (802.1s, 2002) maps groups of VLANs to several tree instances to make use of redundant links. Today RSTP and MSTP are part of IEEE 802.1Q.",
      },
    ],
    howItWorks: [
      { es: "Todos los switches se anuncian como raíz en sus BPDU; gana el Bridge ID más bajo.", en: "Every switch advertises itself as root in its BPDUs; the lowest Bridge ID wins." },
      { es: "Cada switch elige como root port el de menor costo acumulado hacia la raíz.", en: "Each switch picks as root port the one with the lowest cumulative cost to the root." },
      { es: "En cada segmento se elige un puerto designado; los puertos restantes se bloquean.", en: "A designated port is elected on each segment; the remaining ports are blocked." },
      { es: "Si deja de recibir BPDU o cae un enlace, el árbol se recalcula y un puerto bloqueado pasa a forwarding.", en: "If BPDUs stop arriving or a link fails, the tree is recomputed and a blocked port moves to forwarding." },
    ],
    facts: [
      { label: { es: "Hello", en: "Hello" }, value: "2 s" },
      { label: { es: "Convergencia", en: "Convergence" }, value: { es: "STP 30–50 s; RSTP < 1 s típicamente", en: "STP 30–50 s; RSTP typically < 1 s" } },
      { label: { es: "Prioridad por defecto", en: "Default priority" }, value: { es: "32768 (múltiplos de 4096)", en: "32768 (multiples of 4096)" } },
      { label: { es: "Estados RSTP", en: "RSTP states" }, value: "discarding, learning, forwarding" },
      { label: { es: "Variantes", en: "Variants" }, value: "802.1D, 802.1w (RSTP), 802.1s (MSTP)" },
    ],
    security: {
      es: "STP no autentica las BPDU: un equipo que envíe BPDU con prioridad 0 puede convertirse en raíz y desviar el tráfico por él. BPDU guard apaga un puerto de usuario que reciba BPDU, root guard impide que un puerto se vuelva root port, y PortFast (puerto edge) evita la espera en los puertos de equipos finales.",
      en: "STP does not authenticate BPDUs: a device sending BPDUs with priority 0 can become root and pull traffic through itself. BPDU guard shuts down a user port that receives BPDUs, root guard stops a port from becoming a root port, and PortFast (edge port) skips the wait on end-device ports.",
    },
    tools: [
      { command: "show spanning-tree", description: { es: "Raíz, roles y estados de puertos en Cisco IOS", en: "Root, port roles and states on Cisco IOS" } },
      { command: "bridge link show", description: { es: "Estado STP de los puertos de un bridge Linux", en: "STP state of a Linux bridge's ports" } },
    ],
    wireshark: "stp",
    relations: { dependsOn: ["ethernet", "vlan-8021q"] },
    specs: [
      { id: "IEEE 802.1D-2004", title: { es: "Puentes MAC (incluye RSTP)", en: "Media Access Control (MAC) Bridges (includes RSTP)" } },
      { id: "IEEE 802.1Q-2022", title: { es: "Puentes y redes con puentes (incluye RSTP y MSTP)", en: "Bridges and Bridged Networks (includes RSTP and MSTP)" } },
    ],
  },
  {
    id: "dot1x",
    acronym: "802.1X",
    fullName: { es: "Control de acceso a la red basado en puertos", en: "Port-Based Network Access Control" },
    osi: [2],
    category: "security",
    status: "current",
    bodies: ["IEEE"],
    year: 2001,
    identifiers: ["EtherType 0x888E (EAPOL)", "MAC 01:80:C2:00:00:03"],
    summary: {
      es: "802.1X exige que un dispositivo se identifique antes de poder usar un puerto de red cableado o una red Wi-Fi empresarial. Hasta que el servidor de autenticación lo aprueba, el puerto solo deja pasar los mensajes de inicio de sesión.",
      en: "802.1X requires a device to identify itself before it can use a wired network port or an enterprise Wi-Fi network. Until the authentication server approves it, the port only lets login messages through.",
    },
    analogy: {
      es: "Como la recepción de un edificio corporativo: el guardia (switch) no decide por sí mismo, sino que consulta tu credencial con el área de seguridad (RADIUS) antes de abrirte el torniquete.",
      en: "Like the front desk of a corporate building: the guard (switch) does not decide alone but checks your badge with the security office (RADIUS) before opening the turnstile.",
    },
    everyday: {
      es: "Al conectarte a la Wi-Fi de una universidad o empresa con usuario y contraseña (WPA2/WPA3-Enterprise, como eduroam).",
      en: "When you join a university or corporate Wi-Fi with a username and password (WPA2/WPA3-Enterprise, such as eduroam).",
    },
    technical: [
      {
        es: "802.1X define tres roles: el suplicante (el cliente), el autenticador (switch o punto de acceso) y el servidor de autenticación (normalmente RADIUS). El puerto controlado permanece no autorizado y solo acepta tramas EAPOL (EtherType 0x888E) hasta que la autenticación termina con éxito.",
        en: "802.1X defines three roles: the supplicant (the client), the authenticator (switch or access point) and the authentication server (usually RADIUS). The controlled port stays unauthorized and only accepts EAPOL frames (EtherType 0x888E) until authentication succeeds.",
      },
      {
        es: "El autenticador actúa como intermediario: desencapsula EAP (RFC 3748) de EAPOL y lo reenvía dentro de RADIUS (RFC 3579), sin entender el método. El método EAP lo negocian cliente y servidor: EAP-TLS (RFC 5216) con certificados en ambos extremos, o PEAP y EAP-TTLS, que crean un túnel TLS para proteger una contraseña. RADIUS puede devolver atributos como la VLAN que debe asignarse al puerto.",
        en: "The authenticator acts as a pass-through: it unwraps EAP (RFC 3748) from EAPOL and relays it inside RADIUS (RFC 3579) without understanding the method. Client and server negotiate the EAP method: EAP-TLS (RFC 5216) with certificates on both sides, or PEAP and EAP-TTLS, which build a TLS tunnel to protect a password. RADIUS can return attributes such as the VLAN to assign to the port.",
      },
      {
        es: "La primera versión es de 2001; 802.1X-2004 la adaptó a 802.11i y 802.1X-2010 añadió MKA para derivar las claves de MACsec. La revisión vigente es 802.1X-2020. En Wi-Fi, el éxito de EAP produce la clave maestra (PMK) de la que parte el 4-way handshake.",
        en: "The first version dates from 2001; 802.1X-2004 aligned it with 802.11i and 802.1X-2010 added MKA to derive MACsec keys. The current revision is 802.1X-2020. On Wi-Fi, a successful EAP exchange yields the master key (PMK) that feeds the 4-way handshake.",
      },
    ],
    howItWorks: [
      { es: "El enlace se activa y el autenticador envía EAP-Request/Identity (o el cliente envía EAPOL-Start).", en: "The link comes up and the authenticator sends EAP-Request/Identity (or the client sends EAPOL-Start)." },
      { es: "El suplicante responde con su identidad; el autenticador la reenvía al servidor RADIUS en un Access-Request.", en: "The supplicant answers with its identity; the authenticator relays it to the RADIUS server in an Access-Request." },
      { es: "Cliente y servidor ejecutan el método EAP elegido (por ejemplo, EAP-TLS) a través del autenticador.", en: "Client and server run the chosen EAP method (e.g. EAP-TLS) through the authenticator." },
      { es: "RADIUS responde Access-Accept y el switch envía EAP-Success y autoriza el puerto, opcionalmente en una VLAN concreta.", en: "RADIUS answers Access-Accept, and the switch sends EAP-Success and authorizes the port, optionally in a specific VLAN." },
    ],
    facts: [
      { label: { es: "Roles", en: "Roles" }, value: { es: "Suplicante, autenticador, servidor de autenticación", en: "Supplicant, authenticator, authentication server" } },
      { label: { es: "Transporte en la LAN", en: "LAN transport" }, value: "EAPOL (EtherType 0x888E)" },
      { label: { es: "Backend", en: "Backend" }, value: { es: "RADIUS (RFC 3579)", en: "RADIUS (RFC 3579)" } },
      { label: { es: "Métodos comunes", en: "Common methods" }, value: "EAP-TLS, PEAP, EAP-TTLS" },
      { label: { es: "Revisión vigente", en: "Current revision" }, value: "IEEE 802.1X-2020" },
    ],
    security: {
      es: "En cable, 802.1X autentica solo al conectar: un atacante con un hub entre el equipo legítimo y el switch puede colarse con la MAC autorizada. MACsec con MKA cierra ese hueco cifrando el enlace. En métodos con túnel (PEAP, EAP-TTLS) el cliente debe validar el certificado del servidor; si no, un punto de acceso falso puede capturar las credenciales.",
      en: "On wired ports 802.1X authenticates only at connection time: an attacker with a hub between the legitimate device and the switch can piggyback on the authorized MAC. MACsec with MKA closes that gap by encrypting the link. With tunneled methods (PEAP, EAP-TTLS) the client must validate the server certificate; otherwise a rogue access point can harvest credentials.",
    },
    tools: [
      { command: "wpa_cli status", description: { es: "Estado del suplicante y de la autenticación EAP", en: "Supplicant and EAP authentication state" } },
      { command: "show authentication sessions", description: { es: "Sesiones 802.1X por puerto en Cisco IOS", en: "Per-port 802.1X sessions on Cisco IOS" } },
    ],
    wireshark: "eapol",
    relations: { dependsOn: ["ethernet", "radius"], usedBy: ["wifi-mac", "macsec"] },
    specs: [
      { id: "IEEE 802.1X-2020", title: { es: "Control de acceso a la red basado en puertos", en: "Port-Based Network Access Control" } },
      { id: "RFC 3748", title: { es: "Extensible Authentication Protocol (EAP)", en: "Extensible Authentication Protocol (EAP)" }, url: rfc(3748) },
      { id: "RFC 3579", title: { es: "Soporte de RADIUS para EAP", en: "RADIUS Support For EAP" }, url: rfc(3579) },
      { id: "RFC 5216", title: { es: "Protocolo de autenticación EAP-TLS", en: "The EAP-TLS Authentication Protocol" }, url: rfc(5216) },
    ],
  },
  {
    id: "wifi-mac",
    acronym: "802.11 MAC",
    fullName: { es: "Control de acceso al medio de Wi-Fi (IEEE 802.11)", en: "Wi-Fi Medium Access Control (IEEE 802.11)" },
    osi: [2],
    category: "wireless",
    status: "current",
    bodies: ["IEEE"],
    year: 1997,
    summary: {
      es: "La capa MAC de Wi-Fi decide quién puede transmitir por el aire y cuándo, confirma que cada trama llegó y gestiona la conexión y el cifrado entre tu dispositivo y el punto de acceso.",
      en: "The Wi-Fi MAC layer decides who may transmit over the air and when, confirms that each frame arrived, and manages the connection and encryption between your device and the access point.",
    },
    analogy: {
      es: "Como una reunión con un solo micrófono: antes de hablar escuchas si alguien más habla, esperas un momento al azar para no empezar al mismo tiempo que otro, y quien te escucha asiente para confirmar que te entendió.",
      en: "Like a meeting with a single microphone: before speaking you listen for anyone else, wait a random moment so you do not start at the same time as someone else, and the listener nods to confirm they understood.",
    },
    everyday: {
      es: "Cada vez que tu teléfono se conecta a una red Wi-Fi, desde que busca redes hasta que navega.",
      en: "Every time your phone joins a Wi-Fi network, from scanning for networks to browsing.",
    },
    technical: [
      {
        es: "Una radio no puede escuchar mientras transmite, así que 802.11 usa CSMA/CA en lugar de detectar colisiones: la estación sondea el canal, espera un intervalo (DIFS o AIFS) más un backoff aleatorio dentro de la ventana de contención y transmite. Cada trama unicast se confirma con un ACK tras un SIFS; sin ACK, se retransmite. El campo Duration fija el NAV (detección virtual de portadora), y RTS/CTS reserva el canal frente al problema del nodo oculto.",
        en: "A radio cannot listen while it transmits, so 802.11 uses CSMA/CA instead of collision detection: a station senses the channel, waits an interval (DIFS or AIFS) plus a random backoff within the contention window, and transmits. Every unicast frame is acknowledged with an ACK after a SIFS; without an ACK it is retransmitted. The Duration field sets the NAV (virtual carrier sense), and RTS/CTS reserves the channel against the hidden-node problem.",
      },
      {
        es: "Hay tramas de gestión (beacon, probe, authentication, association), de control (RTS, CTS, ACK, Block Ack) y de datos. La cabecera lleva hasta cuatro direcciones cuyo significado depende de los bits To DS/From DS; el formato de 4 direcciones se usa en puentes inalámbricos y mesh. EDCA (802.11e) sustituyó la DCF original con cuatro categorías de acceso (voz, video, best effort y background), y 802.11n introdujo la agregación A-MPDU/A-MSDU con Block Ack.",
        en: "There are management frames (beacon, probe, authentication, association), control frames (RTS, CTS, ACK, Block Ack) and data frames. The header carries up to four addresses whose meaning depends on the To DS/From DS bits; the 4-address format is used by wireless bridges and mesh. EDCA (802.11e) replaced the original DCF with four access categories (voice, video, best effort and background), and 802.11n introduced A-MPDU/A-MSDU aggregation with Block Ack.",
      },
      {
        es: "La seguridad evolucionó de WEP, roto, a WPA2 (802.11i, 2004), que usa AES-CCMP y deriva las claves por sesión con el 4-way handshake a partir de una PSK o de 802.1X. WPA3 (Wi-Fi Alliance, 2018) sustituye la PSK por SAE, resistente a ataques de diccionario fuera de línea, y exige tramas de gestión protegidas (802.11w).",
        en: "Security evolved from broken WEP to WPA2 (802.11i, 2004), which uses AES-CCMP and derives per-session keys with the 4-way handshake from a PSK or 802.1X. WPA3 (Wi-Fi Alliance, 2018) replaces the PSK with SAE, which resists offline dictionary attacks, and mandates protected management frames (802.11w).",
      },
    ],
    howItWorks: [
      { es: "Descubrimiento: el cliente escucha beacons o envía probe requests para encontrar redes (SSID).", en: "Discovery: the client listens for beacons or sends probe requests to find networks (SSIDs)." },
      { es: "Autenticación 802.11 (open system, o SAE en WPA3) y asociación con el punto de acceso.", en: "802.11 authentication (open system, or SAE with WPA3) and association with the access point." },
      { es: "En redes empresariales, 802.1X/EAP autentica al usuario y produce la PMK.", en: "On enterprise networks, 802.1X/EAP authenticates the user and yields the PMK." },
      { es: "4-way handshake: se derivan las claves de sesión (PTK/GTK) y comienza el tráfico de datos cifrado.", en: "4-way handshake: session keys (PTK/GTK) are derived and encrypted data traffic begins." },
    ],
    facts: [
      { label: { es: "Acceso al medio", en: "Medium access" }, value: { es: "CSMA/CA con backoff aleatorio", en: "CSMA/CA with random backoff" } },
      { label: { es: "Confirmación", en: "Acknowledgement" }, value: { es: "ACK por trama unicast (o Block Ack)", en: "Per-unicast-frame ACK (or Block Ack)" } },
      { label: { es: "Tipos de trama", en: "Frame types" }, value: { es: "Gestión, control, datos", en: "Management, control, data" } },
      { label: { es: "Direcciones", en: "Addresses" }, value: { es: "Hasta 4 por trama", en: "Up to 4 per frame" } },
      { label: { es: "Seguridad", en: "Security" }, value: "WPA2 (AES-CCMP), WPA3 (SAE)" },
    ],
    security: {
      es: "WEP y WPA-TKIP no deben usarse. Con WPA2-Personal, quien capture un handshake puede probar contraseñas fuera de línea; WPA3-SAE lo impide. Sin 802.11w, las tramas de deautenticación se falsifican fácilmente para desconectar clientes. KRACK (2017) atacó la reinstalación de claves en el 4-way handshake y se corrigió con parches en los clientes.",
      en: "WEP and WPA-TKIP must not be used. With WPA2-Personal, anyone who captures a handshake can guess passwords offline; WPA3-SAE prevents this. Without 802.11w, deauthentication frames are easily forged to disconnect clients. KRACK (2017) attacked key reinstallation in the 4-way handshake and was fixed with client patches.",
    },
    tools: [
      { command: "iw dev wlan0 link", description: { es: "Punto de acceso asociado, señal y tasa de transmisión", en: "Associated access point, signal and bitrate" } },
      { command: "iw dev wlan0 scan", description: { es: "Lista las redes cercanas y sus capacidades", en: "Lists nearby networks and their capabilities" } },
      { command: "wpa_cli status", description: { es: "Estado de la asociación y del cifrado negociado", en: "Association state and negotiated cipher" } },
    ],
    wireshark: "wlan.fc.type_subtype == 0x08",
    relations: { dependsOn: ["wifi-phy"], usedBy: ["ipv4", "ipv6", "arp", "dot1x"] },
    specs: [
      { id: "IEEE 802.11-2024", url: "https://standards.ieee.org/ieee/802.11/10548/", title: { es: "MAC y PHY de redes de área local inalámbricas", en: "Wireless LAN Medium Access Control (MAC) and Physical Layer (PHY) Specifications" } },
      { id: "IEEE 802.11i-2004", title: { es: "Mejoras de seguridad del MAC (WPA2)", en: "Medium Access Control (MAC) Security Enhancements (WPA2)" } },
    ],
  },
  {
    id: "lldp",
    acronym: "LLDP",
    fullName: { es: "Protocolo de Descubrimiento de la Capa de Enlace", en: "Link Layer Discovery Protocol" },
    osi: [2],
    category: "discovery",
    status: "current",
    bodies: ["IEEE"],
    year: 2005,
    identifiers: ["EtherType 0x88CC", "MAC 01:80:C2:00:00:0E"],
    summary: {
      es: "LLDP permite que cada equipo de red anuncie a su vecino directo quién es: nombre, modelo, puerto y capacidades. Es un estándar abierto que funciona entre fabricantes distintos y facilita documentar y diagnosticar la red.",
      en: "LLDP lets each network device tell its direct neighbor who it is: name, model, port and capabilities. It is an open, vendor-neutral standard that makes documenting and troubleshooting the network easier.",
    },
    analogy: {
      es: "Como una placa en cada puerta que dice quién vive ahí y qué número de departamento es, visible solo para el vecino de enfrente.",
      en: "Like a nameplate on every door saying who lives there and which unit it is, visible only to the neighbor across the hall.",
    },
    everyday: {
      es: "Los teléfonos IP lo usan para saber en qué VLAN de voz trabajar, y los administradores para saber a qué puerto está conectado cada equipo.",
      en: "IP phones use it to learn which voice VLAN to use, and administrators use it to find which port each device is plugged into.",
    },
    technical: [
      {
        es: "LLDP (IEEE 802.1AB, 2005; revisión vigente 802.1AB-2016) es unidireccional: cada agente envía periódicamente una LLDPDU a la MAC multicast 01:80:C2:00:00:0E con EtherType 0x88CC, sin pedir ni esperar respuesta. Los switches que cumplen el estándar no reenvían esa dirección, así que la información solo llega al vecino inmediato.",
        en: "LLDP (IEEE 802.1AB, 2005; current revision 802.1AB-2016) is one-way: each agent periodically sends an LLDPDU to the multicast MAC 01:80:C2:00:00:0E with EtherType 0x88CC, without requesting or expecting a reply. Standards-compliant switches do not forward that address, so the information reaches only the immediate neighbor.",
      },
      {
        es: "La LLDPDU es una lista de TLV. Son obligatorios Chassis ID, Port ID, TTL y End of LLDPDU; los opcionales incluyen nombre y descripción del sistema, capacidades y dirección de gestión, además de TLV específicos de la organización (802.1, 802.3, fabricantes). Por defecto se envía cada 30 s con un TTL de 120 s, y el receptor guarda los datos en una MIB consultable por SNMP.",
        en: "The LLDPDU is a list of TLVs. Chassis ID, Port ID, TTL and End of LLDPDU are mandatory; optional ones include system name and description, capabilities and management address, plus organizationally specific TLVs (802.1, 802.3, vendors). By default it is sent every 30 s with a 120 s TTL, and the receiver stores the data in a MIB that can be queried over SNMP.",
      },
      {
        es: "LLDP-MED (ANSI/TIA-1057) añade TLV para terminales como teléfonos IP: política de red (VLAN de voz y prioridad), ubicación para llamadas de emergencia, inventario y gestión de energía PoE.",
        en: "LLDP-MED (ANSI/TIA-1057) adds TLVs for endpoints such as IP phones: network policy (voice VLAN and priority), location for emergency calls, inventory and PoE power management.",
      },
    ],
    facts: [
      { label: { es: "Dirección", en: "Direction" }, value: { es: "Unidireccional (solo anuncios)", en: "One-way (advertisements only)" } },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Solo el vecino directo", en: "Directly connected neighbor only" } },
      { label: { es: "Intervalo / TTL por defecto", en: "Default interval / TTL" }, value: "30 s / 120 s" },
      { label: { es: "TLV obligatorios", en: "Mandatory TLVs" }, value: "Chassis ID, Port ID, TTL, End" },
      { label: { es: "Equivalente propietario", en: "Proprietary counterpart" }, value: "Cisco CDP" },
    ],
    security: {
      es: "LLDP no autentica y revela modelo, versión de software, direcciones de gestión y VLAN, información útil para un atacante. Conviene desactivarlo en puertos que dan a redes no confiables o a Internet y dejarlo solo en enlaces internos.",
      en: "LLDP is unauthenticated and reveals model, software version, management addresses and VLANs, which is useful to an attacker. It should be disabled on ports facing untrusted networks or the Internet and kept only on internal links.",
    },
    tools: [
      { command: "lldpctl", description: { es: "Muestra los vecinos LLDP detectados (lldpd en Linux)", en: "Shows discovered LLDP neighbors (lldpd on Linux)" } },
      { command: "show lldp neighbors detail", description: { es: "Vecinos LLDP en Cisco IOS y otros sistemas de red", en: "LLDP neighbors on Cisco IOS and other network OSes" } },
    ],
    wireshark: "lldp",
    relations: { dependsOn: ["ethernet"], usedBy: ["poe", "snmp"] },
    specs: [
      { id: "IEEE 802.1AB-2016", title: { es: "Descubrimiento de estaciones y conectividad del control de acceso al medio", en: "Station and Media Access Control Connectivity Discovery" } },
      { id: "ANSI/TIA-1057", title: { es: "LLDP-MED para terminales de medios", en: "LLDP for Media Endpoint Devices (LLDP-MED)" } },
    ],
  },
  {
    id: "cdp",
    acronym: "CDP",
    fullName: { es: "Protocolo de Descubrimiento de Cisco", en: "Cisco Discovery Protocol" },
    osi: [2],
    category: "discovery",
    status: "current",
    bodies: ["Cisco"],
    year: 1994,
    identifiers: ["MAC 01:00:0C:CC:CC:CC", "SNAP OUI 0x00000C, PID 0x2000"],
    summary: {
      es: "CDP es el protocolo propietario de Cisco para que sus equipos se anuncien a los vecinos conectados: nombre, modelo, puerto, dirección IP de gestión y versión de software. Cumple la misma función que LLDP, pero solo entre equipos compatibles con Cisco.",
      en: "CDP is Cisco's proprietary protocol that lets its devices advertise themselves to connected neighbors: name, model, port, management IP address and software version. It does the same job as LLDP, but only among Cisco-compatible devices.",
    },
    everyday: {
      es: "Un técnico que ejecuta 'show cdp neighbors' para trazar cómo están cableados los switches y teléfonos IP de una oficina.",
      en: "A technician running 'show cdp neighbors' to map how an office's switches and IP phones are cabled.",
    },
    technical: [
      {
        es: "CDP se transporta en tramas con encapsulación LLC/SNAP (OUI de Cisco 0x00000C, Protocol ID 0x2000) dirigidas a la MAC multicast 01:00:0C:CC:CC:CC. Los equipos Cisco lo procesan pero no lo reenvían, por lo que solo se ven los vecinos directos. Funciona sobre cualquier medio que soporte SNAP, no solo Ethernet.",
        en: "CDP travels in frames with LLC/SNAP encapsulation (Cisco OUI 0x00000C, Protocol ID 0x2000) addressed to the multicast MAC 01:00:0C:CC:CC:CC. Cisco devices process it but do not forward it, so only direct neighbors are visible. It works over any medium that supports SNAP, not just Ethernet.",
      },
      {
        es: "Los anuncios se envían cada 60 s por defecto con un holdtime de 180 s y contienen TLV como Device ID, direcciones, Port ID, capacidades, plataforma y versión de software. CDPv2 añadió, entre otros, la VLAN nativa y el modo dúplex, lo que permite detectar desajustes entre los extremos de un enlace. Los teléfonos IP de Cisco lo usan para obtener la VLAN de voz y negociar PoE.",
        en: "Advertisements are sent every 60 s by default with a 180 s holdtime and carry TLVs such as Device ID, addresses, Port ID, capabilities, platform and software version. CDPv2 added, among others, the native VLAN and duplex mode, which lets devices detect mismatches between the two ends of a link. Cisco IP phones use it to obtain the voice VLAN and negotiate PoE.",
      },
    ],
    facts: [
      { label: { es: "Intervalo / holdtime por defecto", en: "Default interval / holdtime" }, value: "60 s / 180 s" },
      { label: { es: "Encapsulación", en: "Encapsulation" }, value: "LLC/SNAP" },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Solo el vecino directo", en: "Directly connected neighbor only" } },
      { label: { es: "Estándar abierto equivalente", en: "Open-standard counterpart" }, value: "LLDP (IEEE 802.1AB)" },
    ],
    security: {
      es: "CDP va sin autenticar ni cifrar y expone la versión de software y las direcciones de gestión. Se han publicado vulnerabilidades graves en su procesamiento (por ejemplo, el conjunto CDPwn de 2020), que permitían ejecutar código con una sola trama. Debe desactivarse en interfaces externas o hacia usuarios (no cdp enable).",
      en: "CDP is unauthenticated and unencrypted and exposes the software version and management addresses. Serious parsing vulnerabilities have been published (for example the 2020 CDPwn set) that allowed code execution with a single frame. It should be disabled on external or user-facing interfaces (no cdp enable).",
    },
    tools: [
      { command: "show cdp neighbors detail", description: { es: "Vecinos CDP con IP, plataforma y versión (Cisco IOS)", en: "CDP neighbors with IP, platform and version (Cisco IOS)" } },
      { command: "tcpdump -nn -v -i eth0 ether host 01:00:0c:cc:cc:cc", description: { es: "Captura los anuncios CDP que llegan a un puerto", en: "Captures CDP advertisements arriving at a port" } },
    ],
    wireshark: "cdp",
    relations: { dependsOn: ["ethernet"], usedBy: ["poe"] },
    specs: [
      { id: "Cisco CDP", title: { es: "Cisco Discovery Protocol (especificación propietaria)", en: "Cisco Discovery Protocol (proprietary specification)" } },
    ],
  },
  {
    id: "lacp",
    acronym: "LACP",
    fullName: { es: "Protocolo de Control de Agregación de Enlaces", en: "Link Aggregation Control Protocol" },
    osi: [2],
    category: "switching",
    status: "current",
    bodies: ["IEEE"],
    year: 2000,
    identifiers: ["EtherType 0x8809 (Slow Protocols, subtype 1)", "MAC 01:80:C2:00:00:02"],
    summary: {
      es: "LACP une varios cables de red entre dos equipos para que funcionen como un solo enlace más rápido y tolerante a fallos. Si un cable se cae, el tráfico sigue por los demás sin cortar la conexión.",
      en: "LACP bundles several network cables between two devices so they work as one faster, fault-tolerant link. If a cable fails, traffic continues over the others without dropping the connection.",
    },
    analogy: {
      es: "Como abrir varias casetas en una autopista: cada coche usa una sola caseta, pero en conjunto pasan muchos más, y si una cierra el resto sigue funcionando.",
      en: "Like opening several toll booths on a highway: each car uses just one booth, but together far more get through, and if one closes the rest keep working.",
    },
    everyday: {
      es: "Enlaces entre switches de un edificio, servidores con dos tarjetas de red y equipos NAS con puertos agregados.",
      en: "Links between a building's switches, servers with two network cards and NAS boxes with bonded ports.",
    },
    technical: [
      {
        es: "LACP negocia la agregación mediante LACPDU enviadas con el EtherType de Slow Protocols 0x8809 (subtipo 1) a la MAC 01:80:C2:00:00:02. Cada extremo anuncia su prioridad de sistema, MAC, clave de agregación y estado de puerto; solo se agregan puertos compatibles (misma velocidad y dúplex) cuyos parámetros coinciden en ambos lados, lo que evita bucles por errores de cableado.",
        en: "LACP negotiates aggregation through LACPDUs sent with the Slow Protocols EtherType 0x8809 (subtype 1) to MAC 01:80:C2:00:00:02. Each end advertises its system priority, MAC, aggregation key and port state; only compatible ports (same speed and duplex) whose parameters match on both sides are bundled, which prevents loops from cabling mistakes.",
      },
      {
        es: "Un puerto puede estar en modo active (inicia el envío de LACPDU) o passive (solo responde); al menos un extremo debe ser active. Las LACPDU se envían cada 1 s en modo fast o cada 30 s en modo slow, y un puerto se retira del grupo tras tres intervalos sin recibirlas.",
        en: "A port can be in active mode (initiates LACPDUs) or passive mode (only responds); at least one end must be active. LACPDUs are sent every 1 s in fast mode or every 30 s in slow mode, and a port is removed from the bundle after three intervals without receiving them.",
      },
      {
        es: "El reparto de tráfico no lo define LACP: cada equipo aplica un hash sobre MAC, IP y/o puertos para asignar cada flujo a un enlace, de modo que las tramas de un flujo no se desordenen. Por eso un solo flujo nunca supera la velocidad de un enlace individual. Nació como IEEE 802.3ad (2000) y en 2008 pasó a IEEE 802.1AX.",
        en: "Traffic distribution is not defined by LACP: each device hashes MACs, IPs and/or ports to pin every flow to one link, so a flow's frames are never reordered. That is why a single flow never exceeds the speed of one member link. It was born as IEEE 802.3ad (2000) and moved to IEEE 802.1AX in 2008.",
      },
    ],
    facts: [
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Slow Protocols (EtherType 0x8809)", en: "Slow Protocols (EtherType 0x8809)" } },
      { label: { es: "Modos", en: "Modes" }, value: { es: "Active / passive", en: "Active / passive" } },
      { label: { es: "Intervalo de LACPDU", en: "LACPDU interval" }, value: { es: "1 s (fast) o 30 s (slow)", en: "1 s (fast) or 30 s (slow)" } },
      { label: { es: "Reparto de carga", en: "Load sharing" }, value: { es: "Hash por flujo (no por paquete)", en: "Per-flow hash (not per packet)" } },
      { label: { es: "Estándar vigente", en: "Current standard" }, value: "IEEE 802.1AX-2020" },
    ],
    tools: [
      { command: "cat /proc/net/bonding/bond0", description: { es: "Estado LACP de cada miembro de un bond en Linux", en: "LACP state of each member of a Linux bond" } },
      { command: "show etherchannel summary", description: { es: "Resumen de grupos agregados en Cisco IOS", en: "Summary of aggregated groups on Cisco IOS" } },
    ],
    wireshark: "lacp",
    relations: { dependsOn: ["ethernet"] },
    specs: [
      { id: "IEEE 802.1AX-2020", title: { es: "Agregación de enlaces", en: "Link Aggregation" } },
      { id: "IEEE 802.3ad-2000", title: { es: "Agregación de múltiples enlaces (original)", en: "Aggregation of Multiple Link Segments (original)" } },
    ],
  },
  {
    id: "ppp",
    acronym: "PPP",
    fullName: { es: "Protocolo Punto a Punto", en: "Point-to-Point Protocol" },
    osi: [2],
    category: "framing",
    status: "current",
    bodies: ["IETF"],
    year: 1989,
    identifiers: ["PPP protocol 0xC021 (LCP)", "0x8021 (IPCP)", "0xC223 (CHAP)"],
    summary: {
      es: "PPP conecta dos equipos por un enlace directo, como una línea serial, un módem o un acceso de banda ancha. Además de transportar los paquetes, negocia los parámetros del enlace, autentica al usuario y asigna la dirección IP.",
      en: "PPP connects two devices over a direct link such as a serial line, a modem or a broadband access line. Besides carrying packets, it negotiates link parameters, authenticates the user and assigns the IP address.",
    },
    everyday: {
      es: "En la era del módem telefónico conectaba a casi todos a Internet; hoy sigue vivo dentro de PPPoE en muchas conexiones DSL y de fibra, y en túneles L2TP.",
      en: "In the dial-up era it connected almost everyone to the Internet; today it lives on inside PPPoE on many DSL and fiber connections, and in L2TP tunnels.",
    },
    technical: [
      {
        es: "PPP tiene tres piezas: un tramado tipo HDLC (RFC 1662), el Link Control Protocol (LCP) que establece y prueba el enlace, y una familia de Network Control Protocols (NCP) que configuran cada protocolo de red, como IPCP para IPv4 (RFC 1332) e IPV6CP para IPv6 (RFC 5072). Un campo Protocol de 2 B identifica el contenido de cada trama: 0x0021 IPv4, 0x0057 IPv6, 0xC021 LCP.",
        en: "PPP has three pieces: HDLC-like framing (RFC 1662), the Link Control Protocol (LCP) that establishes and tests the link, and a family of Network Control Protocols (NCPs) that configure each network protocol, such as IPCP for IPv4 (RFC 1332) and IPV6CP for IPv6 (RFC 5072). A 2 B Protocol field identifies each frame's contents: 0x0021 IPv4, 0x0057 IPv6, 0xC021 LCP.",
      },
      {
        es: "En líneas seriales, la trama va delimitada por el flag 0x7E, con dirección 0xFF, control 0x03 y un FCS de 16 o 32 bits; los bytes que coinciden con el flag se escapan (byte stuffing). LCP negocia la MRU (1500 B por defecto), el protocolo de autenticación y un magic number que detecta enlaces en bucle.",
        en: "On serial lines the frame is delimited by the 0x7E flag, with address 0xFF, control 0x03 and a 16- or 32-bit FCS; bytes that match the flag are escaped (byte stuffing). LCP negotiates the MRU (1500 B by default), the authentication protocol and a magic number that detects looped-back links.",
      },
      {
        es: "RFC 1661 (1994, STD 51) es la especificación vigente; la primera versión fue RFC 1134 (1989). La autenticación puede ser PAP (RFC 1334), que envía usuario y contraseña en claro, o CHAP (RFC 1994), que responde a un desafío con un hash MD5 y puede repetir el desafío durante la sesión.",
        en: "RFC 1661 (1994, STD 51) is the current specification; the first version was RFC 1134 (1989). Authentication can be PAP (RFC 1334), which sends username and password in cleartext, or CHAP (RFC 1994), which answers a challenge with an MD5 hash and can re-challenge during the session.",
      },
    ],
    howItWorks: [
      { es: "Establecimiento: LCP intercambia Configure-Request/Ack para acordar MRU, autenticación y opciones.", en: "Establish: LCP exchanges Configure-Request/Ack to agree on MRU, authentication and options." },
      { es: "Autenticación: el cliente se identifica con PAP o CHAP.", en: "Authenticate: the client identifies itself with PAP or CHAP." },
      { es: "Red: cada NCP (IPCP, IPV6CP) configura su protocolo; IPCP puede asignar la IP y los DNS.", en: "Network: each NCP (IPCP, IPV6CP) configures its protocol; IPCP can assign the IP address and DNS servers." },
      { es: "Datos y cierre: fluyen los paquetes y LCP termina el enlace con Terminate-Request.", en: "Data and teardown: packets flow, and LCP closes the link with Terminate-Request." },
    ],
    facts: [
      { label: { es: "Tramado", en: "Framing" }, value: { es: "Tipo HDLC, flag 0x7E (RFC 1662)", en: "HDLC-like, 0x7E flag (RFC 1662)" } },
      { label: { es: "MRU por defecto", en: "Default MRU" }, value: "1500 B" },
      { label: { es: "Autenticación", en: "Authentication" }, value: "PAP, CHAP, EAP" },
      { label: { es: "Protocolos de red", en: "Network protocols" }, value: { es: "Múltiples, mediante NCP", en: "Multiple, via NCPs" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: { es: "No nativo", en: "Not built in" } },
    ],
    security: {
      es: "PAP envía la contraseña en texto claro y solo debe usarse sobre enlaces ya protegidos. CHAP no expone la contraseña, pero el servidor debe guardarla en forma recuperable y MD5 es débil ante ataques de diccionario sobre un intercambio capturado. MS-CHAPv2 (RFC 2759) está roto y no debe usarse sin un túnel que lo proteja.",
      en: "PAP sends the password in cleartext and should only be used over already protected links. CHAP does not expose the password, but the server must store it in recoverable form, and MD5 is weak against dictionary attacks on a captured exchange. MS-CHAPv2 (RFC 2759) is broken and must not be used without a protecting tunnel.",
    },
    tools: [
      { command: "pppd call provider nodetach debug", description: { es: "Inicia una conexión PPP en Linux mostrando la negociación", en: "Starts a PPP connection on Linux showing the negotiation" } },
      { command: "debug ppp negotiation", description: { es: "Traza LCP/NCP en tiempo real en Cisco IOS", en: "Traces LCP/NCP in real time on Cisco IOS" } },
    ],
    wireshark: "ppp",
    relations: { dependsOn: ["hdlc"], usedBy: ["pppoe", "l2tp", "pptp"] },
    specs: [
      { id: "RFC 1661", title: { es: "The Point-to-Point Protocol (PPP)", en: "The Point-to-Point Protocol (PPP)" }, url: rfc(1661) },
      { id: "RFC 1662", title: { es: "PPP en tramado tipo HDLC", en: "PPP in HDLC-like Framing" }, url: rfc(1662) },
      { id: "RFC 1332", title: { es: "Protocolo de control IP de PPP (IPCP)", en: "The PPP Internet Protocol Control Protocol (IPCP)" }, url: rfc(1332) },
      { id: "RFC 5072", title: { es: "IP versión 6 sobre PPP", en: "IP Version 6 over PPP" }, url: rfc(5072) },
      { id: "RFC 1994", title: { es: "Protocolo de autenticación CHAP", en: "PPP Challenge Handshake Authentication Protocol (CHAP)" }, url: rfc(1994) },
    ],
  },
  {
    id: "pppoe",
    acronym: "PPPoE",
    fullName: { es: "PPP sobre Ethernet", en: "PPP over Ethernet" },
    osi: [2],
    category: "framing",
    status: "current",
    bodies: ["IETF"],
    year: 1999,
    identifiers: ["EtherType 0x8863 (discovery)", "EtherType 0x8864 (session)"],
    summary: {
      es: "PPPoE lleva sesiones PPP dentro de tramas Ethernet. Así los proveedores de Internet pueden pedir usuario y contraseña, llevar el control de cada cliente y asignarle su IP, aunque la conexión física sea Ethernet.",
      en: "PPPoE carries PPP sessions inside Ethernet frames. It lets Internet providers ask for a username and password, keep track of each customer and assign their IP, even though the physical connection is Ethernet.",
    },
    everyday: {
      es: "Es el usuario y contraseña de 'Internet' que viene configurado en muchos módems DSL y de fibra.",
      en: "It is the Internet username and password preconfigured in many DSL and fiber modems.",
    },
    technical: [
      {
        es: "PPPoE (RFC 2516, 1999) tiene dos etapas. En la de descubrimiento (EtherType 0x8863), el cliente busca un concentrador de acceso (AC) con PADI en broadcast, recibe ofertas PADO, elige una con PADR y el AC confirma con PADS, que incluye un Session ID de 16 bits. PADT termina la sesión desde cualquiera de los dos extremos.",
        en: "PPPoE (RFC 2516, 1999) has two stages. In discovery (EtherType 0x8863), the client looks for an access concentrator (AC) with a broadcast PADI, receives PADO offers, picks one with PADR, and the AC confirms with PADS, which carries a 16-bit Session ID. PADT ends the session from either side.",
      },
      {
        es: "En la etapa de sesión (EtherType 0x8864), cada trama lleva una cabecera PPPoE de 6 B (versión, tipo, código, Session ID y longitud) seguida del campo Protocol de PPP de 2 B. Esos 8 B reducen la MTU a 1492 B; por eso los routers ajustan el MSS de TCP a 1452 B (MSS clamping) para evitar problemas de fragmentación. RFC 4638 permite una MTU de 1500 B si la red admite tramas un poco más grandes.",
        en: "In the session stage (EtherType 0x8864), each frame carries a 6 B PPPoE header (version, type, code, Session ID and length) followed by PPP's 2 B Protocol field. Those 8 B reduce the MTU to 1492 B, which is why routers clamp the TCP MSS to 1452 B to avoid fragmentation problems. RFC 4638 allows a 1500 B MTU when the network supports slightly larger frames.",
      },
    ],
    howItWorks: [
      { es: "PADI: el cliente envía un broadcast buscando concentradores de acceso.", en: "PADI: the client broadcasts a search for access concentrators." },
      { es: "PADO: cada concentrador disponible responde con una oferta.", en: "PADO: each available concentrator replies with an offer." },
      { es: "PADR / PADS: el cliente elige uno y recibe el Session ID.", en: "PADR / PADS: the client picks one and receives the Session ID." },
      { es: "Sesión: corre PPP completo (LCP, PAP/CHAP, IPCP) y el tráfico IP viaja encapsulado; PADT la cierra.", en: "Session: full PPP runs (LCP, PAP/CHAP, IPCP) and IP traffic travels encapsulated; PADT closes it." },
    ],
    facts: [
      { label: { es: "Sobrecarga", en: "Overhead" }, value: { es: "8 B (6 PPPoE + 2 PPP)", en: "8 B (6 PPPoE + 2 PPP)" } },
      { label: { es: "MTU", en: "MTU" }, value: { es: "1492 B (1500 B con RFC 4638)", en: "1492 B (1500 B with RFC 4638)" } },
      { label: { es: "MSS TCP recomendado", en: "Recommended TCP MSS" }, value: "1452 B (IPv4)" },
      { label: { es: "Session ID", en: "Session ID" }, value: "16 bits" },
    ],
    security: {
      es: "El descubrimiento no está autenticado: un equipo malicioso en el mismo segmento puede responder a los PADI como si fuera el concentrador o enviar PADT falsos para cortar sesiones. La autenticación de PPP con PAP viaja en claro, aunque en la práctica solo recorre el enlace hasta el proveedor.",
      en: "Discovery is unauthenticated: a malicious device on the same segment can answer PADIs posing as the concentrator or send forged PADTs to drop sessions. PPP authentication with PAP travels in cleartext, though in practice only across the link to the provider.",
    },
    tools: [
      { command: "pppoe-discovery -I eth0", description: { es: "Ejecuta solo la etapa de descubrimiento y lista los concentradores", en: "Runs only the discovery stage and lists the concentrators" } },
      { command: "ip link show ppp0", description: { es: "Muestra la interfaz PPP y su MTU", en: "Shows the PPP interface and its MTU" } },
    ],
    wireshark: "pppoed",
    relations: { dependsOn: ["ethernet", "ppp"] },
    specs: [
      { id: "RFC 2516", title: { es: "Método para transmitir PPP sobre Ethernet (PPPoE)", en: "A Method for Transmitting PPP Over Ethernet (PPPoE)" }, url: rfc(2516) },
      { id: "RFC 4638", title: { es: "Admitir MTU/MRU mayores a 1492 en PPPoE", en: "Accommodating a Maximum Transit Unit/Maximum Receive Unit (MTU/MRU) Greater Than 1492 in PPPoE" }, url: rfc(4638) },
    ],
  },
  {
    id: "hdlc",
    acronym: "HDLC",
    fullName: { es: "Control de Enlace de Datos de Alto Nivel", en: "High-Level Data Link Control" },
    osi: [2],
    category: "framing",
    status: "legacy",
    bodies: ["ISO/IEC"],
    year: 1979,
    identifiers: ["Flag 0x7E"],
    summary: {
      es: "HDLC es un protocolo clásico para enviar tramas por enlaces seriales punto a punto, como las antiguas líneas dedicadas entre sucursales. Muchos protocolos de enlace posteriores, como PPP y Frame Relay, heredaron su formato.",
      en: "HDLC is a classic protocol for sending frames over point-to-point serial links, such as the old leased lines between branch offices. Many later link protocols, such as PPP and Frame Relay, inherited its format.",
    },
    everyday: {
      es: "Era la encapsulación por defecto en las interfaces seriales de los routers Cisco que unían oficinas por líneas E1/T1.",
      en: "It was the default encapsulation on the serial interfaces of Cisco routers linking offices over E1/T1 lines.",
    },
    technical: [
      {
        es: "Una trama HDLC tiene flag de apertura 0x7E, dirección, control (8 o 16 bits), información, FCS de 16 o 32 bits (CRC) y flag de cierre. Para que el flag no aparezca dentro de los datos se usa bit stuffing: el emisor inserta un 0 tras cada cinco 1 consecutivos y el receptor lo elimina. Así el protocolo es transparente para cualquier contenido.",
        en: "An HDLC frame has an opening 0x7E flag, address, control (8 or 16 bits), information, a 16- or 32-bit FCS (CRC) and a closing flag. To keep the flag from appearing inside the data it uses bit stuffing: the sender inserts a 0 after every five consecutive 1s and the receiver removes it. This makes the protocol transparent to any content.",
      },
      {
        es: "El campo de control define tres tipos de trama: I (información, con números de secuencia de envío y recepción para control de flujo y errores), S (supervisión: RR, RNR, REJ, SREJ) y U (no numeradas, para establecer y liberar el enlace: SABM, UA, DISC). Admite los modos NRM, ARM y ABM; de él derivan LAPB (X.25), LAPD (RDSI) y LAPF (Frame Relay).",
        en: "The control field defines three frame types: I (information, with send and receive sequence numbers for flow and error control), S (supervisory: RR, RNR, REJ, SREJ) and U (unnumbered, for setting up and releasing the link: SABM, UA, DISC). It supports NRM, ARM and ABM modes; LAPB (X.25), LAPD (ISDN) and LAPF (Frame Relay) derive from it.",
      },
      {
        es: "La ISO lo publicó en 1979 (ISO 3309 e ISO 4335), a partir del SDLC de IBM, y hoy se consolida en ISO/IEC 13239. El HDLC estándar no indica qué protocolo de red transporta, por eso Cisco creó su variante propietaria (cHDLC) con un campo de tipo similar a un EtherType y keepalives; al ser propietaria, solo interopera entre equipos Cisco, y para enlaces multifabricante se usa PPP.",
        en: "ISO published it in 1979 (ISO 3309 and ISO 4335), based on IBM's SDLC, and today it is consolidated in ISO/IEC 13239. Standard HDLC does not indicate which network protocol it carries, so Cisco created its proprietary variant (cHDLC) with an EtherType-like type field and keepalives; being proprietary, it only interoperates between Cisco devices, and PPP is used for multi-vendor links.",
      },
    ],
    facts: [
      { label: { es: "Delimitador", en: "Delimiter" }, value: { es: "Flag 0x7E + bit stuffing", en: "0x7E flag + bit stuffing" } },
      { label: { es: "Tipos de trama", en: "Frame types" }, value: { es: "I (información), S (supervisión), U (no numeradas)", en: "I (information), S (supervisory), U (unnumbered)" } },
      { label: { es: "FCS", en: "FCS" }, value: { es: "CRC de 16 o 32 bits", en: "16- or 32-bit CRC" } },
      { label: { es: "Derivados", en: "Derivatives" }, value: "LAPB, LAPD, LAPF, PPP, Cisco HDLC" },
    ],
    tools: [
      { command: "show interfaces serial 0/0/0", description: { es: "Encapsulación, estado y errores de una interfaz serial (Cisco IOS)", en: "Encapsulation, state and errors of a serial interface (Cisco IOS)" } },
    ],
    wireshark: "chdlc",
    relations: { usedBy: ["ppp", "frame-relay"] },
    specs: [
      { id: "ISO/IEC 13239:2002", title: { es: "Procedimientos de control de enlace de datos de alto nivel (HDLC)", en: "High-level data link control (HDLC) procedures" } },
    ],
  },
  {
    id: "macsec",
    acronym: "MACsec",
    fullName: { es: "Seguridad del control de acceso al medio (IEEE 802.1AE)", en: "Media Access Control Security (IEEE 802.1AE)" },
    osi: [2],
    category: "security",
    status: "current",
    bodies: ["IEEE"],
    year: 2006,
    identifiers: ["EtherType 0x88E5"],
    summary: {
      es: "MACsec cifra y autentica cada trama Ethernet entre dos equipos directamente conectados, de modo que nadie que intercepte el cable pueda leer ni modificar el tráfico. Protege cualquier protocolo que viaje por el enlace, sin que las aplicaciones lo noten.",
      en: "MACsec encrypts and authenticates every Ethernet frame between two directly connected devices, so nobody tapping the cable can read or tamper with the traffic. It protects any protocol crossing the link, transparently to applications.",
    },
    everyday: {
      es: "Enlaces entre centros de datos, conexiones de switches en campus y redes de operadores que necesitan cifrar a velocidad de línea.",
      en: "Links between data centers, switch-to-switch connections on campuses and carrier networks that need line-rate encryption.",
    },
    technical: [
      {
        es: "MACsec inserta tras las MAC una SecTAG (EtherType 0x88E5) de 8 B, o 16 B si incluye el Secure Channel Identifier, y añade al final un ICV de 16 B. La SecTAG lleva un Packet Number que protege contra la reinyección de tramas. El payload se cifra con GCM-AES-128, la suite obligatoria, o GCM-AES-256; las variantes XPN amplían el Packet Number a 64 bits para enlaces de 40 Gb/s o más.",
        en: "MACsec inserts after the MACs a SecTAG (EtherType 0x88E5) of 8 B, or 16 B when it includes the Secure Channel Identifier, and appends a 16 B ICV. The SecTAG carries a Packet Number that protects against frame replay. The payload is encrypted with GCM-AES-128, the mandatory suite, or GCM-AES-256; the XPN variants extend the Packet Number to 64 bits for links of 40 Gb/s and above.",
      },
      {
        es: "La protección es salto a salto: cada equipo con MACsec descifra, conmuta y vuelve a cifrar, así que el tráfico queda en claro dentro de los switches, a diferencia de IPsec o TLS, que protegen de extremo a extremo. Como opera en capa 2, protege también ARP, DHCP y otros protocolos que no son IP.",
        en: "Protection is hop by hop: each MACsec device decrypts, switches and re-encrypts, so traffic is in the clear inside the switches, unlike IPsec or TLS, which protect end to end. Because it runs at layer 2 it also protects ARP, DHCP and other non-IP protocols.",
      },
      {
        es: "Las claves se gestionan con MKA (MACsec Key Agreement), definido en IEEE 802.1X-2010: a partir de una CAK, ya sea precompartida o derivada de una autenticación 802.1X/EAP, se elige un servidor de claves que distribuye la SAK usada para cifrar. La especificación vigente es IEEE 802.1AE-2018.",
        en: "Keys are managed with MKA (MACsec Key Agreement), defined in IEEE 802.1X-2010: from a CAK, either pre-shared or derived from an 802.1X/EAP authentication, a key server is elected that distributes the SAK used for encryption. The current specification is IEEE 802.1AE-2018.",
      },
    ],
    facts: [
      { label: { es: "Sobrecarga", en: "Overhead" }, value: { es: "24–32 B por trama (SecTAG + ICV)", en: "24–32 B per frame (SecTAG + ICV)" } },
      { label: { es: "Cifrado", en: "Cipher" }, value: "GCM-AES-128 / GCM-AES-256 (XPN)" },
      { label: { es: "Alcance", en: "Scope" }, value: { es: "Salto a salto (enlace)", en: "Hop by hop (per link)" } },
      { label: { es: "Gestión de claves", en: "Key management" }, value: { es: "MKA (IEEE 802.1X-2010)", en: "MKA (IEEE 802.1X-2010)" } },
      { label: { es: "Anti-replay", en: "Anti-replay" }, value: { es: "Sí (Packet Number)", en: "Yes (Packet Number)" } },
    ],
    security: {
      es: "MACsec garantiza confidencialidad, integridad y protección contra replay en el cable, y cierra el hueco de 802.1X frente a un intruso conectado detrás de un equipo autorizado. No protege los datos dentro de los equipos intermedios ni más allá del enlace, y una CAK precompartida débil o reutilizada compromete todos los enlaces que la usen.",
      en: "MACsec provides confidentiality, integrity and replay protection on the wire, and closes 802.1X's gap against an intruder attached behind an authorized device. It does not protect data inside intermediate devices or beyond the link, and a weak or reused pre-shared CAK compromises every link that uses it.",
    },
    tools: [
      { command: "ip macsec show", description: { es: "Canales seguros, SA y contadores de MACsec en Linux", en: "MACsec secure channels, SAs and counters on Linux" } },
      { command: "show mka sessions", description: { es: "Estado de las sesiones MKA en Cisco IOS", en: "MKA session state on Cisco IOS" } },
    ],
    wireshark: "macsec",
    relations: { dependsOn: ["ethernet", "dot1x"] },
    specs: [
      { id: "IEEE 802.1AE-2018", title: { es: "Seguridad del control de acceso al medio (MACsec)", en: "Media Access Control (MAC) Security" } },
      { id: "IEEE 802.1X-2020", title: { es: "Control de acceso basado en puertos (incluye MKA)", en: "Port-Based Network Access Control (includes MKA)" } },
    ],
  },
  {
    id: "arp",
    acronym: "ARP",
    fullName: { es: "Protocolo de Resolución de Direcciones", en: "Address Resolution Protocol" },
    osi: [2, 3],
    category: "resolution",
    status: "current",
    bodies: ["IETF"],
    year: 1982,
    identifiers: ["EtherType 0x0806"],
    summary: {
      es: "ARP averigua qué dirección física (MAC) corresponde a una dirección IPv4 dentro de la red local. Sin él, tu equipo sabría a qué IP enviar un paquete, pero no a qué tarjeta de red entregarlo.",
      en: "ARP finds out which physical (MAC) address belongs to an IPv4 address on the local network. Without it, your computer would know which IP to send a packet to, but not which network card to deliver it to.",
    },
    analogy: {
      es: "Como gritar en una oficina: '¿Quién tiene la extensión 204?', y que solo esa persona levante la mano y diga en qué escritorio está.",
      en: "Like calling out in an office: 'Who has extension 204?', and only that person raises a hand and says which desk they are at.",
    },
    everyday: {
      es: "Cada vez que tu equipo envía algo a Internet, primero usa ARP para conocer la MAC de tu router (la puerta de enlace).",
      en: "Every time your computer sends something to the Internet, it first uses ARP to learn the MAC of your router (the default gateway).",
    },
    technical: [
      {
        es: "ARP (RFC 826, 1982, STD 37) viaja directamente en tramas Ethernet con EtherType 0x0806. El mensaje para IPv4 sobre Ethernet mide 28 B: tipo de hardware (1), tipo de protocolo (0x0800), longitudes (6 y 4), operación (1 = request, 2 = reply) y las direcciones MAC e IP del emisor y del objetivo. La petición se envía en broadcast a ff:ff:ff:ff:ff:ff y la respuesta en unicast.",
        en: "ARP (RFC 826, 1982, STD 37) travels directly in Ethernet frames with EtherType 0x0806. The message for IPv4 over Ethernet is 28 B: hardware type (1), protocol type (0x0800), lengths (6 and 4), operation (1 = request, 2 = reply) and the sender's and target's MAC and IP addresses. The request is broadcast to ff:ff:ff:ff:ff:ff and the reply is unicast.",
      },
      {
        es: "Las respuestas se guardan en una caché con caducidad que varía según el sistema; Cisco IOS usa 4 horas por defecto. Un ARP gratuito anuncia la propia IP sin que nadie la pida, para actualizar cachés tras un cambio de MAC o una conmutación de alta disponibilidad, y RFC 5227 lo usa para detectar direcciones IPv4 duplicadas. El proxy ARP (RFC 1027) permite que un router responda en nombre de otra red.",
        en: "Replies are stored in a cache whose lifetime varies by system; Cisco IOS defaults to 4 hours. A gratuitous ARP announces one's own IP unprompted to refresh caches after a MAC change or a high-availability failover, and RFC 5227 uses it to detect duplicate IPv4 addresses. Proxy ARP (RFC 1027) lets a router answer on behalf of another network.",
      },
      {
        es: "ARP solo existe para IPv4. En IPv6 lo sustituye el Neighbor Discovery Protocol (NDP, RFC 4861), que usa mensajes ICMPv6 enviados a direcciones multicast en vez de broadcast.",
        en: "ARP exists only for IPv4. In IPv6 it is replaced by the Neighbor Discovery Protocol (NDP, RFC 4861), which uses ICMPv6 messages sent to multicast addresses instead of broadcast.",
      },
    ],
    howItWorks: [
      { es: "El equipo necesita enviar a una IP de su subred (o a su puerta de enlace) y no tiene la MAC en caché.", en: "The host needs to send to an IP on its subnet (or to its gateway) and has no cached MAC for it." },
      { es: "Envía un ARP request en broadcast: '¿Quién tiene 192.168.1.1? Responde a 192.168.1.20'.", en: "It broadcasts an ARP request: 'Who has 192.168.1.1? Tell 192.168.1.20'." },
      { es: "El dueño de esa IP responde en unicast con su MAC.", en: "The owner of that IP replies by unicast with its MAC." },
      { es: "El emisor guarda la asociación IP–MAC en su caché y envía la trama.", en: "The sender stores the IP–MAC mapping in its cache and sends the frame." },
    ],
    facts: [
      { label: { es: "Mensaje (IPv4/Ethernet)", en: "Message (IPv4/Ethernet)" }, value: "28 B" },
      { label: { es: "Operaciones", en: "Operations" }, value: { es: "1 = request, 2 = reply", en: "1 = request, 2 = reply" } },
      { label: { es: "Petición", en: "Request" }, value: { es: "Broadcast", en: "Broadcast" } },
      { label: { es: "Autenticación", en: "Authentication" }, value: { es: "Ninguna", en: "None" } },
      { label: { es: "Sucesor en IPv6", en: "IPv6 successor" }, value: "NDP (RFC 4861)" },
    ],
    security: {
      es: "ARP acepta respuestas sin verificar y sin haberlas pedido, así que un atacante en la LAN puede anunciar su MAC para la IP del router (ARP spoofing o poisoning) y colocarse en medio del tráfico. Dynamic ARP Inspection (DAI) en los switches valida cada ARP contra la tabla de DHCP snooping; también ayudan las entradas estáticas para equipos críticos y cifrar el tráfico con TLS.",
      en: "ARP accepts replies unverified and even unsolicited, so an attacker on the LAN can advertise its MAC for the router's IP (ARP spoofing or poisoning) and sit in the middle of the traffic. Dynamic ARP Inspection (DAI) on switches validates every ARP against the DHCP snooping table; static entries for critical hosts and encrypting traffic with TLS also help.",
    },
    multiLayerNote: {
      es: "ARP se transporta directamente en tramas de capa 2 (EtherType 0x0806), no dentro de IP, pero su función es servir a la capa 3: traduce direcciones IPv4 a direcciones MAC. Por eso algunos textos lo ubican en L2, otros en L3 y otros lo llaman 'capa 2.5'.",
      en: "ARP is carried directly in layer 2 frames (EtherType 0x0806), not inside IP, yet its job is to serve layer 3: it maps IPv4 addresses to MAC addresses. That is why some texts place it at L2, others at L3, and others call it 'layer 2.5'.",
    },
    tools: [
      { command: "ip neigh show", description: { es: "Muestra la caché de vecinos (ARP/NDP) en Linux", en: "Shows the neighbor (ARP/NDP) cache on Linux" } },
      { command: "arp -a", description: { es: "Muestra la caché ARP en Windows, macOS y Linux", en: "Shows the ARP cache on Windows, macOS and Linux" } },
      { command: "arping -I eth0 192.168.1.1", description: { es: "Envía peticiones ARP para comprobar si una IP responde", en: "Sends ARP requests to check whether an IP answers" } },
    ],
    wireshark: "arp",
    relations: { dependsOn: ["ethernet"], usedBy: ["ipv4"], replacedBy: ["ndp"] },
    specs: [
      { id: "RFC 826", title: { es: "Protocolo de resolución de direcciones Ethernet", en: "An Ethernet Address Resolution Protocol" }, url: rfc(826) },
      { id: "RFC 5227", title: { es: "Detección de conflictos de direcciones IPv4", en: "IPv4 Address Conflict Detection" }, url: rfc(5227) },
    ],
  },
  {
    id: "frame-relay",
    acronym: "Frame Relay",
    fullName: { es: "Frame Relay (retransmisión de tramas)", en: "Frame Relay" },
    osi: [2],
    category: "wan",
    status: "legacy",
    bodies: ["ITU-T"],
    year: 1988,
    identifiers: ["DLCI 16–1007"],
    summary: {
      es: "Frame Relay fue durante los años noventa y dos mil la forma más común de unir las sucursales de una empresa a través de la red de un operador, más barata que una línea dedicada por cada par de oficinas. Hoy lo ha sustituido MPLS.",
      en: "Throughout the 1990s and 2000s, Frame Relay was the most common way to connect a company's branches through a carrier network, cheaper than a leased line for every pair of offices. MPLS has since replaced it.",
    },
    analogy: {
      es: "Como rentar carriles virtuales en una autopista compartida: tienes garantizada cierta velocidad y, si hay espacio libre, puedes ir más rápido, pero en un embotellamiento tu exceso es lo primero que se descarta.",
      en: "Like renting virtual lanes on a shared highway: you are guaranteed a certain speed and can go faster when there is room, but in a jam your excess is the first to be dropped.",
    },
    technical: [
      {
        es: "Frame Relay es un servicio orientado a circuitos virtuales, normalmente permanentes (PVC). La cabecera de 2 B lleva un DLCI de 10 bits con significado local, que identifica el circuito en cada enlace, junto con los bits FECN y BECN, que notifican congestión, y DE, que marca las tramas descartables. El núcleo está definido en ITU-T Q.922 (LAPF, derivado de HDLC) y ANSI T1.618.",
        en: "Frame Relay is a virtual-circuit service, usually permanent virtual circuits (PVCs). The 2 B header carries a locally significant 10-bit DLCI that identifies the circuit on each link, plus the FECN and BECN bits, which signal congestion, and DE, which marks drop-eligible frames. The core is defined in ITU-T Q.922 (LAPF, HDLC-derived) and ANSI T1.618.",
      },
      {
        es: "El operador garantiza un CIR (Committed Information Rate) por circuito; el tráfico por encima de él puede enviarse en ráfagas (Bc/Be), pero se marca DE y es lo primero que se descarta. Frame Relay detecta tramas corruptas y las descarta sin retransmitir: la recuperación queda en manos de las capas superiores, lo que lo hizo mucho más ligero que X.25.",
        en: "The carrier guarantees a CIR (Committed Information Rate) per circuit; traffic above it may burst (Bc/Be) but is marked DE and dropped first. Frame Relay detects corrupt frames and discards them without retransmission: recovery is left to upper layers, which made it far lighter than X.25.",
      },
      {
        es: "LMI (ANSI T1.617 Anexo D, ITU-T Q.933 Anexo A o la variante de Cisco) informa el estado de los PVC, e Inverse ARP (RFC 2390) descubre la IP del otro extremo de cada DLCI. MPLS VPN y Ethernet de operador lo reemplazaron porque ofrecen más velocidad y enrutamiento any-to-any sin configurar un circuito por cada par de sitios.",
        en: "LMI (ANSI T1.617 Annex D, ITU-T Q.933 Annex A or Cisco's variant) reports PVC status, and Inverse ARP (RFC 2390) discovers the IP at the far end of each DLCI. MPLS VPNs and carrier Ethernet replaced it because they offer higher speeds and any-to-any routing without configuring a circuit for every pair of sites.",
      },
    ],
    facts: [
      { label: { es: "Cabecera", en: "Header" }, value: { es: "2 B (DLCI de 10 bits)", en: "2 B (10-bit DLCI)" } },
      { label: { es: "Circuitos", en: "Circuits" }, value: { es: "PVC (y SVC, poco usados)", en: "PVC (and rarely used SVC)" } },
      { label: { es: "Garantía", en: "Guarantee" }, value: { es: "CIR por circuito", en: "Per-circuit CIR" } },
      { label: { es: "Congestión", en: "Congestion" }, value: "FECN, BECN, DE" },
      { label: { es: "Recuperación de errores", en: "Error recovery" }, value: { es: "No (descarta tramas dañadas)", en: "No (drops damaged frames)" } },
    ],
    tools: [
      { command: "show frame-relay pvc", description: { es: "Estado y contadores de cada PVC (Cisco IOS)", en: "State and counters of each PVC (Cisco IOS)" } },
      { command: "show frame-relay map", description: { es: "Asociaciones entre DLCI e IP remotas", en: "Mappings between DLCIs and remote IPs" } },
    ],
    wireshark: "fr",
    relations: { dependsOn: ["hdlc"], replacedBy: ["mpls"] },
    specs: [
      { id: "ITU-T Q.922", title: { es: "Especificación de la capa de enlace para servicios en modo trama (LAPF)", en: "ISDN data link layer specification for frame mode bearer services (LAPF)" } },
      { id: "ANSI T1.618", title: { es: "Aspectos centrales del protocolo Frame Relay", en: "Core Aspects of Frame Protocol for Use with Frame Relay Bearer Service" } },
      { id: "RFC 2427", title: { es: "Interconexión multiprotocolo sobre Frame Relay", en: "Multiprotocol Interconnect over Frame Relay" }, url: rfc(2427) },
    ],
  },
  {
    id: "atm",
    acronym: "ATM",
    fullName: { es: "Modo de Transferencia Asíncrono", en: "Asynchronous Transfer Mode" },
    osi: [2, 1],
    category: "wan",
    status: "legacy",
    bodies: ["ITU-T"],
    year: 1990,
    identifiers: ["VPI/VCI", "53 B cells"],
    summary: {
      es: "ATM transporta toda la información, ya sea voz, video o datos, en celdas diminutas de tamaño fijo por circuitos virtuales, con calidad de servicio garantizada. Fue la gran apuesta de los operadores en los noventa y estuvo detrás de las primeras conexiones ADSL, pero Ethernet, IP y MPLS terminaron desplazándolo.",
      en: "ATM carries all information, whether voice, video or data, in tiny fixed-size cells over virtual circuits with guaranteed quality of service. It was the carriers' big bet in the 1990s and sat behind the first ADSL connections, but Ethernet, IP and MPLS eventually displaced it.",
    },
    analogy: {
      es: "Como un tren con vagones idénticos y pequeños: todo se reparte en el mismo tamaño de vagón, así cualquier carga se maneja igual de rápido y a tiempo, aunque se desperdicie algo de espacio.",
      en: "Like a train of small, identical cars: everything is split into the same car size, so any cargo is handled equally fast and on time, at the cost of some wasted space.",
    },
    technical: [
      {
        es: "La celda ATM mide 53 B: 5 B de cabecera y 48 B de payload. En la interfaz usuario-red (UNI), la cabecera contiene GFC (4 bits), VPI (8 bits), VCI (16 bits), tipo de payload (3), CLP (1, prioridad de descarte) y HEC (8 bits, un CRC sobre la cabecera que corrige errores de un bit); en la interfaz entre nodos (NNI) el VPI crece a 12 bits. Los 48 B fueron un compromiso entre los 32 que proponía Europa y los 64 de Estados Unidos.",
        en: "An ATM cell is 53 B: a 5 B header and a 48 B payload. At the user-network interface (UNI) the header holds GFC (4 bits), VPI (8 bits), VCI (16 bits), payload type (3), CLP (1, discard priority) and HEC (8 bits, a header CRC that corrects single-bit errors); at the network-node interface (NNI) the VPI grows to 12 bits. The 48 B size was a compromise between the 32 B Europe proposed and the 64 B of the United States.",
      },
      {
        es: "Es orientado a conexión: antes de transmitir se establece un circuito virtual (PVC o SVC) identificado por el par VPI/VCI, que los conmutadores reescriben en cada salto. Las capas de adaptación (AAL) adecuan cada servicio: AAL1 para tasa constante, como la voz, y AAL5 para datos, que segmenta paquetes de hasta 65 535 B y añade un trailer de 8 B con CRC-32. Las categorías de servicio (CBR, rt-VBR, nrt-VBR, ABR, UBR) definían garantías de retardo y ancho de banda.",
        en: "It is connection-oriented: before transmitting, a virtual circuit (PVC or SVC) is set up, identified by the VPI/VCI pair that switches rewrite at each hop. Adaptation layers (AAL) fit each service: AAL1 for constant rate such as voice, and AAL5 for data, which segments packets of up to 65,535 B and adds an 8 B trailer with a CRC-32. Service categories (CBR, rt-VBR, nrt-VBR, ABR, UBR) defined delay and bandwidth guarantees.",
      },
      {
        es: "La capa ATM está definida en ITU-T I.361 y AAL5 en I.363.5; el ATM Forum completó las especificaciones de interfaces y señalización. Su sobrecarga fija (la 'cell tax', cerca del 10 % solo por cabeceras) y la complejidad frente a Ethernet e IP lo relegaron; su última gran implantación fue el ADSL, con PPPoA o PPPoE sobre AAL5.",
        en: "The ATM layer is defined in ITU-T I.361 and AAL5 in I.363.5; the ATM Forum completed the interface and signalling specifications. Its fixed overhead (the 'cell tax', about 10 % from headers alone) and its complexity compared with Ethernet and IP sidelined it; its last major deployment was ADSL, with PPPoA or PPPoE over AAL5.",
      },
    ],
    facts: [
      { label: { es: "Celda", en: "Cell" }, value: { es: "53 B (5 cabecera + 48 payload)", en: "53 B (5 header + 48 payload)" } },
      { label: { es: "Identificador de circuito", en: "Circuit identifier" }, value: { es: "VPI/VCI (8/16 bits en UNI)", en: "VPI/VCI (8/16 bits at the UNI)" } },
      { label: { es: "Protección de cabecera", en: "Header protection" }, value: { es: "HEC de 8 bits", en: "8-bit HEC" } },
      { label: { es: "AAL para datos", en: "Data AAL" }, value: { es: "AAL5 (trailer de 8 B con CRC-32)", en: "AAL5 (8 B trailer with CRC-32)" } },
      { label: { es: "QoS", en: "QoS" }, value: "CBR, rt-VBR, nrt-VBR, ABR, UBR" },
    ],
    multiLayerNote: {
      es: "La conmutación de celdas por VPI/VCI es una función de capa 2, pero ATM también define su propia subcapa física: la convergencia de transmisión usa el HEC para delimitar celdas dentro del flujo de bits de SONET/SDH o DSL (L1). Además, sus AAL y su señalización de circuitos virtuales cubren funciones que en el modelo OSI corresponderían a capas superiores, así que no encaja en una sola capa.",
      en: "Cell switching by VPI/VCI is a layer 2 function, but ATM also defines its own physical sublayer: transmission convergence uses the HEC to delineate cells within the SONET/SDH or DSL bit stream (L1). Its AALs and virtual-circuit signalling also cover functions that the OSI model would assign to higher layers, so it does not fit into a single layer.",
    },
    tools: [
      { command: "show atm vc", description: { es: "Circuitos virtuales ATM y su estado (Cisco IOS)", en: "ATM virtual circuits and their state (Cisco IOS)" } },
    ],
    wireshark: "atm",
    relations: { dependsOn: ["sonet-sdh", "dsl"], usedBy: ["pppoe"], replacedBy: ["mpls", "ethernet"] },
    specs: [
      { id: "ITU-T I.361", title: { es: "Especificación de la capa ATM de la RDSI-BA", en: "B-ISDN ATM layer specification" } },
      { id: "ITU-T I.363.5", title: { es: "Capa de adaptación ATM tipo 5 (AAL5)", en: "B-ISDN ATM Adaptation Layer specification: Type 5 AAL" } },
      { id: "RFC 2684", title: { es: "Encapsulación multiprotocolo sobre AAL5", en: "Multiprotocol Encapsulation over ATM Adaptation Layer 5" }, url: rfc(2684) },
    ],
  },
];
