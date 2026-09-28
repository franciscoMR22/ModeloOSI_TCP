import type { Protocol } from "@/lib/protocols/types";

const itu = (rec: string) => `https://www.itu.int/rec/T-REC-${rec}`;

export const L1_PROTOCOLS: Protocol[] = [
  {
    id: "100base-tx",
    acronym: "100BASE-TX",
    fullName: { es: "Fast Ethernet sobre par trenzado", en: "Fast Ethernet over twisted pair" },
    osi: [1],
    category: "copper",
    status: "current",
    bodies: ["IEEE"],
    year: 1995,
    identifiers: ["100 Mb/s", "Cat5, 100 m", "2 pares / 2 pairs", "125 MBd"],
    summary: {
      es: "100BASE-TX es la forma de Ethernet a 100 Mb/s por cable de red de cobre, la llamada Fast Ethernet. Usa solo dos de los cuatro pares del cable y llega hasta 100 metros. Hoy la superaron las versiones de gigabit, pero sigue presente en impresoras, cámaras y equipos industriales.",
      en: "100BASE-TX is 100 Mb/s Ethernet over copper network cable, known as Fast Ethernet. It uses only two of the cable's four pairs and reaches up to 100 metres. Gigabit versions have overtaken it, but it is still found in printers, cameras and industrial gear.",
    },
    analogy: {
      es: "Es como una carretera de dos carriles, uno de ida y otro de vuelta: cada extremo habla por un par y escucha por el otro, así que nunca chocan.",
      en: "It is like a two-lane road, one lane each way: each end talks on one pair and listens on the other, so they never collide.",
    },
    everyday: {
      es: "Cuando tu PC muestra «100 Mbps» en la conexión de red, suele ser porque el cable o un equipo intermedio solo soporta Fast Ethernet.",
      en: "When your PC reports a “100 Mbps” network link, it is usually because the cable or some device in between only supports Fast Ethernet.",
    },
    technical: [
      {
        es: "Definido en IEEE 802.3u (1995), hoy cláusula 25 de IEEE 802.3, reutiliza la subcapa física de FDDI sobre cobre (TP-PMD). Los datos se codifican en 4B5B (cada 4 bits se transmiten como 5), lo que eleva los 100 Mb/s a 125 MBd; luego se aleatorizan con un scrambler y se transmiten con MLT-3, un código de tres niveles (−1, 0, +1) que reduce la frecuencia fundamental a 31,25 MHz para caber dentro de los 100 MHz de un cable Cat5.",
        en: "Defined in IEEE 802.3u (1995), now clause 25 of IEEE 802.3, it reuses FDDI's copper physical sublayer (TP-PMD). Data is 4B5B-encoded (every 4 bits sent as 5), raising 100 Mb/s to 125 MBd; it is then scrambled and sent with MLT-3, a three-level code (−1, 0, +1) that lowers the fundamental frequency to 31.25 MHz so it fits within a Cat5 cable's 100 MHz.",
      },
      {
        es: "Usa los pares de los pines 1-2 (transmisión) y 3-6 (recepción) en el lado MDI, lo que permite full-duplex sin colisiones. La autonegociación (cláusula 28) intercambia ráfagas FLP para acordar velocidad y dúplex; si un extremo la tiene desactivada y el otro no, aparece el clásico desajuste de dúplex, con colisiones tardías y errores de CRC. Auto-MDI/MDIX detecta si hace falta cruzar los pares.",
        en: "It uses the pairs on pins 1-2 (transmit) and 3-6 (receive) on the MDI side, allowing collision-free full-duplex. Auto-negotiation (clause 28) exchanges FLP bursts to agree on speed and duplex; if one end has it disabled and the other does not, the classic duplex mismatch appears, with late collisions and CRC errors. Auto-MDI/MDIX detects whether the pairs need crossing.",
      },
      {
        es: "Como toda la capa física, es invisible para Wireshark: la tarjeta de red entrega tramas ya decodificadas, sin símbolos de línea, preámbulo ni, normalmente, FCS. Los problemas de L1 se diagnostican con contadores del driver (errores de CRC, de alineación, pérdidas de enlace) y con probadores de cable.",
        en: "Like the whole physical layer, it is invisible to Wireshark: the network card hands over already-decoded frames, without line symbols, preamble or, usually, the FCS. L1 problems are diagnosed with driver counters (CRC and alignment errors, link flaps) and cable testers.",
      },
    ],
    facts: [
      { label: { es: "Velocidad", en: "Speed" }, value: "100 Mb/s" },
      { label: { es: "Codificación", en: "Encoding" }, value: "4B5B + scrambler + MLT-3" },
      { label: { es: "Tasa de símbolos", en: "Symbol rate" }, value: "125 MBd" },
      { label: { es: "Pares usados", en: "Pairs used" }, value: { es: "2 (pines 1-2 y 3-6)", en: "2 (pins 1-2 and 3-6)" } },
      { label: { es: "Distancia máxima", en: "Maximum distance" }, value: { es: "100 m sobre Cat5 o superior", en: "100 m over Cat5 or better" } },
    ],
    tools: [
      { command: "ethtool eth0", description: { es: "Muestra velocidad, dúplex y estado de la autonegociación", en: "Shows speed, duplex and auto-negotiation status" } },
      { command: "ethtool -s eth0 speed 100 duplex full autoneg off", description: { es: "Fuerza 100 Mb/s full-duplex (ambos extremos deben coincidir)", en: "Forces 100 Mb/s full-duplex (both ends must match)" } },
      { command: "ethtool --cable-test eth0", description: { es: "Prueba TDR del cable si el PHY la soporta (pares abiertos o en corto)", en: "Runs a TDR cable test if the PHY supports it (open or shorted pairs)" } },
    ],
    relations: { dependsOn: ["tia-568"], usedBy: ["ethernet", "poe"], replacedBy: ["1000base-t"] },
    specs: [
      { id: "IEEE 802.3u-1995", title: { es: "Fast Ethernet (100BASE-T)", en: "Fast Ethernet (100BASE-T)" } },
      { id: "IEEE 802.3 cl. 25", title: { es: "PMD 100BASE-TX", en: "100BASE-TX PMD" } },
    ],
  },
  {
    id: "1000base-t",
    acronym: "1000BASE-T",
    fullName: { es: "Gigabit Ethernet sobre par trenzado", en: "Gigabit Ethernet over twisted pair" },
    osi: [1],
    category: "copper",
    status: "current",
    bodies: ["IEEE"],
    year: 1999,
    identifiers: ["1 Gb/s", "Cat5e, 100 m", "4 pares / 4 pairs", "125 MBd por par / per pair"],
    summary: {
      es: "1000BASE-T es el Ethernet de 1 Gb/s por cable de cobre que usan casi todas las computadoras, routers y switches actuales. Aprovecha los cuatro pares del cable a la vez y en ambos sentidos, sobre el mismo cableado que ya existía para Fast Ethernet.",
      en: "1000BASE-T is the 1 Gb/s Ethernet over copper cable used by nearly every current computer, router and switch. It uses all four pairs of the cable at once and in both directions, over the same cabling that already existed for Fast Ethernet.",
    },
    analogy: {
      es: "Como cuatro personas hablando por cuatro teléfonos al mismo tiempo que escuchan: cada una resta su propia voz para oír la del otro lado.",
      en: "Like four people talking on four phones while also listening: each one subtracts their own voice to hear the far end.",
    },
    everyday: {
      es: "El puerto «Gigabit» de tu laptop, tu consola o tu router doméstico.",
      en: "The “Gigabit” port on your laptop, game console or home router.",
    },
    technical: [
      {
        es: "Definido en IEEE 802.3ab (1999), hoy cláusula 40 de IEEE 802.3, transmite 250 Mb/s por cada uno de los 4 pares a 125 MBd, igual que la tasa de símbolos de 100BASE-TX. Cada símbolo es PAM-5 (niveles −2, −1, 0, +1, +2) y los cuatro pares forman un símbolo 4D protegido con un código trellis de 8 estados, decodificado con Viterbi, que compensa el menor margen de ruido de cinco niveles.",
        en: "Defined in IEEE 802.3ab (1999), now clause 40 of IEEE 802.3, it sends 250 Mb/s on each of the 4 pairs at 125 MBd, the same symbol rate as 100BASE-TX. Each symbol is PAM-5 (levels −2, −1, 0, +1, +2) and the four pairs form a 4D symbol protected by an 8-state trellis code, decoded with Viterbi, which offsets the smaller noise margin of five levels.",
      },
      {
        es: "Todos los pares son full-duplex simultáneo: un híbrido separa transmisión y recepción, y el DSP aplica cancelación de eco, de NEXT y de FEXT para eliminar la propia señal y la diafonía de los otros tres pares. Por eso la autonegociación es obligatoria: además de velocidad y dúplex, decide qué extremo es maestro y proporciona el reloj de símbolos.",
        en: "All pairs run simultaneous full-duplex: a hybrid separates transmit and receive, and the DSP applies echo, NEXT and FEXT cancellation to remove its own signal and crosstalk from the other three pairs. That is why auto-negotiation is mandatory: besides speed and duplex, it decides which end is master and supplies the symbol clock.",
      },
      {
        es: "Se diseñó para Cat5 de 100 m, pero los parámetros adicionales de diafonía y retorno que exige hicieron de Cat5e el mínimo recomendado. Un solo par dañado impide el enlace a 1 Gb/s; muchos equipos bajan entonces a 100 Mb/s, que solo necesita dos pares, síntoma típico de un conector mal ponchado.",
        en: "It was designed for 100 m of Cat5, but the extra crosstalk and return-loss parameters it demands made Cat5e the recommended minimum. A single damaged pair prevents a 1 Gb/s link; many devices then fall back to 100 Mb/s, which needs only two pairs, a typical symptom of a badly crimped connector.",
      },
    ],
    facts: [
      { label: { es: "Velocidad", en: "Speed" }, value: "1 Gb/s" },
      { label: { es: "Modulación", en: "Modulation" }, value: { es: "PAM-5 4D con código trellis", en: "4D PAM-5 with trellis coding" } },
      { label: { es: "Tasa de símbolos", en: "Symbol rate" }, value: { es: "125 MBd por par", en: "125 MBd per pair" } },
      { label: { es: "Pares usados", en: "Pairs used" }, value: { es: "4, full-duplex en cada uno", en: "4, full-duplex on each" } },
      { label: { es: "Distancia máxima", en: "Maximum distance" }, value: { es: "100 m (Cat5e recomendado)", en: "100 m (Cat5e recommended)" } },
      { label: { es: "Autonegociación", en: "Auto-negotiation" }, value: { es: "Obligatoria (maestro/esclavo)", en: "Mandatory (master/slave)" } },
    ],
    tools: [
      { command: "ethtool eth0", description: { es: "Muestra la velocidad negociada y los modos anunciados", en: "Shows the negotiated speed and advertised modes" } },
      { command: "ethtool -S eth0", description: { es: "Contadores del driver: errores de CRC, de símbolo, caídas de enlace", en: "Driver counters: CRC and symbol errors, link drops" } },
      { command: "ethtool --cable-test eth0", description: { es: "Prueba TDR de los 4 pares si el PHY la soporta", en: "TDR test of all 4 pairs if the PHY supports it" } },
    ],
    relations: { dependsOn: ["tia-568"], usedBy: ["ethernet", "poe"], replaces: ["100base-tx"], replacedBy: ["10gbase-t"] },
    specs: [
      { id: "IEEE 802.3ab-1999", title: { es: "Capa física 1000BASE-T", en: "1000BASE-T physical layer" } },
      { id: "IEEE 802.3 cl. 40", title: { es: "PCS, PMA y PMD 1000BASE-T", en: "1000BASE-T PCS, PMA and PMD" } },
    ],
  },
  {
    id: "10gbase-t",
    acronym: "10GBASE-T",
    fullName: { es: "10 Gigabit Ethernet sobre par trenzado", en: "10 Gigabit Ethernet over twisted pair" },
    osi: [1],
    category: "copper",
    status: "current",
    bodies: ["IEEE"],
    year: 2006,
    identifiers: ["10 Gb/s", "Cat6A, 100 m", "Cat6, ~55 m", "800 MBd por par / per pair"],
    summary: {
      es: "10GBASE-T lleva 10 Gb/s por cable de cobre con conector RJ45, diez veces más que Gigabit. Requiere cable de mejor calidad (Cat6A para 100 m) y electrónica muy sofisticada. Sus hermanos 2.5GBASE-T y 5GBASE-T aprovechan el cableado Cat5e/Cat6 existente.",
      en: "10GBASE-T carries 10 Gb/s over copper cable with RJ45 connectors, ten times Gigabit. It needs better cable (Cat6A for 100 m) and very sophisticated electronics. Its siblings 2.5GBASE-T and 5GBASE-T make use of existing Cat5e/Cat6 cabling.",
    },
    everyday: {
      es: "Servidores, NAS y switches de centro de datos; los puertos de 2,5 Gb/s de routers Wi-Fi 6/7 y placas base recientes usan la variante 2.5GBASE-T.",
      en: "Servers, NAS boxes and data-centre switches; the 2.5 Gb/s ports on Wi-Fi 6/7 routers and recent motherboards use the 2.5GBASE-T variant.",
    },
    technical: [
      {
        es: "Definido en IEEE 802.3an (2006), hoy cláusula 55 de IEEE 802.3, transmite por los 4 pares a 800 MBd, con frecuencia de Nyquist de 400 MHz. Los símbolos PAM-16 se agrupan de dos en dos en una constelación DSQ128 (128 puntos en doble cuadrado) y los datos se protegen con un código LDPC (2048,1723); el resultado son 3,125 bits útiles por símbolo y par: 4 × 800 M × 3,125 = 10 Gb/s.",
        en: "Defined in IEEE 802.3an (2006), now clause 55 of IEEE 802.3, it transmits over all 4 pairs at 800 MBd, with a 400 MHz Nyquist frequency. PAM-16 symbols are paired into a DSQ128 constellation (128 double-square points) and data is protected by an LDPC (2048,1723) code; the result is 3.125 useful bits per symbol per pair: 4 × 800 M × 3.125 = 10 Gb/s.",
      },
      {
        es: "Además de cancelar eco, NEXT y FEXT, usa precodificación Tomlinson-Harashima para compensar la distorsión del canal. El factor limitante es la diafonía ajena (alien crosstalk) entre cables vecinos del mismo haz, que no se puede cancelar porque proviene de otros enlaces. Cat6A, especificado hasta 500 MHz, garantiza 100 m; sobre Cat6 se alcanzan unos 55 m según el entorno. El DSP y el LDPC hacen que consuma más energía y tenga más latencia que la fibra.",
        en: "Besides echo, NEXT and FEXT cancellation, it uses Tomlinson-Harashima precoding to compensate channel distortion. The limiting factor is alien crosstalk between neighbouring cables in the same bundle, which cannot be cancelled because it comes from other links. Cat6A, specified up to 500 MHz, guarantees 100 m; over Cat6 about 55 m are achievable depending on the environment. The DSP and LDPC make it draw more power and add more latency than fibre.",
      },
      {
        es: "IEEE 802.3bz (2016) añadió 2.5GBASE-T y 5GBASE-T, versiones escaladas a 200 y 400 MBd de la misma técnica, pensadas para dar más de 1 Gb/s a 100 m sobre el cableado Cat5e y Cat6 ya instalado, sobre todo para puntos de acceso Wi-Fi.",
        en: "IEEE 802.3bz (2016) added 2.5GBASE-T and 5GBASE-T, versions of the same technique scaled to 200 and 400 MBd, meant to deliver more than 1 Gb/s at 100 m over installed Cat5e and Cat6 cabling, mainly for Wi-Fi access points.",
      },
    ],
    facts: [
      { label: { es: "Velocidad", en: "Speed" }, value: "10 Gb/s" },
      { label: { es: "Modulación", en: "Modulation" }, value: "PAM-16 / DSQ128 + LDPC" },
      { label: { es: "Tasa de símbolos", en: "Symbol rate" }, value: { es: "800 MBd por par", en: "800 MBd per pair" } },
      { label: { es: "Distancia", en: "Distance" }, value: { es: "100 m en Cat6A; ~55 m en Cat6", en: "100 m on Cat6A; ~55 m on Cat6" } },
      { label: { es: "Variantes", en: "Variants" }, value: { es: "2.5G/5GBASE-T (802.3bz, 2016)", en: "2.5G/5GBASE-T (802.3bz, 2016)" } },
    ],
    tools: [
      { command: "ethtool eth0", description: { es: "Muestra si se negoció 10000baseT/Full, 5000baseT o 2500baseT", en: "Shows whether 10000baseT/Full, 5000baseT or 2500baseT was negotiated" } },
      { command: "ethtool -S eth0", description: { es: "Contadores de errores del PHY y del MAC", en: "PHY and MAC error counters" } },
    ],
    relations: { dependsOn: ["tia-568"], usedBy: ["ethernet"], replaces: ["1000base-t"] },
    specs: [
      { id: "IEEE 802.3an-2006", title: { es: "Capa física 10GBASE-T", en: "10GBASE-T physical layer" } },
      { id: "IEEE 802.3bz-2016", title: { es: "2.5GBASE-T y 5GBASE-T", en: "2.5GBASE-T and 5GBASE-T" } },
    ],
  },
  {
    id: "ethernet-fiber",
    acronym: "Ethernet (fibra)",
    fullName: { es: "Ethernet sobre fibra óptica (SX, LX, SR, LR…)", en: "Ethernet over optical fibre (SX, LX, SR, LR…)" },
    osi: [1],
    category: "fiber",
    status: "current",
    bodies: ["IEEE"],
    year: 1998,
    identifiers: ["MMF 850 nm", "SMF 1310 / 1550 nm", "SFP / SFP+ / QSFP"],
    summary: {
      es: "Ethernet también viaja como pulsos de luz por fibra óptica, lo que permite distancias de cientos de metros a decenas de kilómetros y velocidades de 1 Gb/s a 400 Gb/s y más. Es la columna vertebral de los centros de datos, los edificios y las redes de operadores.",
      en: "Ethernet also travels as light pulses over optical fibre, allowing distances from hundreds of metres to tens of kilometres and speeds from 1 Gb/s to 400 Gb/s and beyond. It is the backbone of data centres, buildings and carrier networks.",
    },
    analogy: {
      es: "La fibra multimodo es como un pasillo ancho donde la luz rebota por muchos caminos y se desordena pronto; la monomodo es un túnel tan estrecho que solo cabe un camino, y la señal llega limpia mucho más lejos.",
      en: "Multimode fibre is like a wide hallway where light bounces along many paths and smears quickly; single-mode is a tunnel so narrow only one path fits, so the signal arrives clean much farther away.",
    },
    everyday: {
      es: "Los enlaces entre pisos de un edificio, entre switches de un centro de datos y los módulos SFP que se enchufan en los puertos de un switch.",
      en: "Links between floors of a building, between switches in a data centre, and the SFP modules plugged into a switch's ports.",
    },
    technical: [
      {
        es: "IEEE 802.3z (1998) definió Gigabit Ethernet óptico: 1000BASE-SX (850 nm sobre multimodo, 220 a 550 m según la fibra) y 1000BASE-LX (1310 nm, hasta 5 km en monomodo), ambos con codificación 8b/10b a 1,25 GBd. IEEE 802.3ae (2002) trajo 10 GbE con codificación 64b/66b a 10,3125 GBd: 10GBASE-SR (850 nm, 300 m en OM3 y 400 m en OM4), 10GBASE-LR (1310 nm, 10 km) y 10GBASE-ER (1550 nm, 40 km).",
        en: "IEEE 802.3z (1998) defined optical Gigabit Ethernet: 1000BASE-SX (850 nm over multimode, 220 to 550 m depending on the fibre) and 1000BASE-LX (1310 nm, up to 5 km over single-mode), both 8b/10b-encoded at 1.25 GBd. IEEE 802.3ae (2002) brought 10 GbE with 64b/66b encoding at 10.3125 GBd: 10GBASE-SR (850 nm, 300 m on OM3 and 400 m on OM4), 10GBASE-LR (1310 nm, 10 km) and 10GBASE-ER (1550 nm, 40 km).",
      },
      {
        es: "La fibra multimodo (núcleo de 50 µm, clases OM3/OM4 optimizadas para láser VCSEL) es barata pero la dispersión modal limita la distancia; la monomodo (núcleo de ~9 µm) usa láseres de 1310/1550 nm y llega a decenas de kilómetros. Las velocidades mayores combinan carriles: IEEE 802.3ba (2010) definió 40 y 100 GbE con varias fibras en paralelo (conector MPO) o varias longitudes de onda (100GBASE-LR4), e IEEE 802.3bs (2017) llevó a 200 y 400 GbE con modulación PAM4 y FEC obligatoria.",
        en: "Multimode fibre (50 µm core, OM3/OM4 grades optimised for VCSEL lasers) is cheap but modal dispersion limits reach; single-mode (~9 µm core) uses 1310/1550 nm lasers and reaches tens of kilometres. Higher speeds combine lanes: IEEE 802.3ba (2010) defined 40 and 100 GbE with parallel fibres (MPO connector) or multiple wavelengths (100GBASE-LR4), and IEEE 802.3bs (2017) moved to 200 and 400 GbE with PAM4 modulation and mandatory FEC.",
      },
      {
        es: "La óptica suele ir en transceptores enchufables definidos por acuerdos multifabricante (MSA): SFP para 1 G, SFP+ para 10 G, SFP28 para 25 G, QSFP+ para 40 G, QSFP28 para 100 G y QSFP-DD u OSFP para 400 G. Casi todos incluyen monitoreo digital (DOM/DDM) que reporta temperatura, potencia óptica transmitida y recibida, útil para detectar conectores sucios o fibras dobladas.",
        en: "The optics usually live in pluggable transceivers defined by multi-source agreements (MSAs): SFP for 1 G, SFP+ for 10 G, SFP28 for 25 G, QSFP+ for 40 G, QSFP28 for 100 G and QSFP-DD or OSFP for 400 G. Almost all include digital monitoring (DOM/DDM) reporting temperature and transmitted and received optical power, useful for spotting dirty connectors or bent fibres.",
      },
    ],
    facts: [
      { label: { es: "Multimodo", en: "Multimode" }, value: { es: "850 nm, OM3/OM4, cientos de metros", en: "850 nm, OM3/OM4, hundreds of metres" } },
      { label: { es: "Monomodo", en: "Single-mode" }, value: { es: "1310 / 1550 nm, 10 a 40 km o más", en: "1310 / 1550 nm, 10 to 40 km or more" } },
      { label: { es: "Codificación", en: "Encoding" }, value: { es: "8b/10b (1 G), 64b/66b (10 G+), PAM4 (400 G)", en: "8b/10b (1 G), 64b/66b (10 G+), PAM4 (400 G)" } },
      { label: { es: "Transceptores", en: "Transceivers" }, value: "SFP, SFP+, SFP28, QSFP+, QSFP28, QSFP-DD, OSFP" },
      { label: { es: "Inmunidad", en: "Immunity" }, value: { es: "Inmune a interferencia electromagnética", en: "Immune to electromagnetic interference" } },
    ],
    security: {
      es: "La fibra no irradia señal como el cobre, pero no es inviolable: doblar la fibra permite extraer luz (fiber tapping) sin cortar el enlace, algo detectable como una caída de potencia recibida. Para enlaces sensibles se cifra en capa 2 con MACsec.",
      en: "Fibre does not radiate signal like copper, but it is not tamper-proof: bending the fibre lets an attacker tap light without cutting the link, which shows up as a drop in received power. Sensitive links are encrypted at layer 2 with MACsec.",
    },
    tools: [
      { command: "ethtool -m eth0", description: { es: "Lee la EEPROM del transceptor y el DOM (potencia Tx/Rx, temperatura)", en: "Reads the transceiver EEPROM and DOM (Tx/Rx power, temperature)" } },
      { command: "show interfaces transceiver", description: { es: "Niveles ópticos de los módulos en switches Cisco IOS", en: "Optical levels of modules on Cisco IOS switches" } },
      { command: "OTDR", description: { es: "Reflectómetro óptico: equipo de campo que localiza cortes, empalmes y pérdidas en la fibra", en: "Optical time-domain reflectometer: field instrument that locates breaks, splices and losses along the fibre" } },
    ],
    relations: { usedBy: ["ethernet", "macsec"] },
    specs: [
      { id: "IEEE 802.3z-1998", title: { es: "Gigabit Ethernet (1000BASE-X)", en: "Gigabit Ethernet (1000BASE-X)" } },
      { id: "IEEE 802.3ae-2002", title: { es: "10 Gigabit Ethernet", en: "10 Gigabit Ethernet" } },
      { id: "IEEE 802.3ba-2010", title: { es: "40 y 100 Gigabit Ethernet", en: "40 and 100 Gigabit Ethernet" } },
      { id: "IEEE 802.3bs-2017", title: { es: "200 y 400 Gigabit Ethernet", en: "200 and 400 Gigabit Ethernet" } },
    ],
  },
  {
    id: "wifi-phy",
    acronym: "802.11 PHY",
    fullName: { es: "Capa física de Wi-Fi (IEEE 802.11)", en: "Wi-Fi physical layer (IEEE 802.11)" },
    osi: [1],
    category: "wireless",
    status: "current",
    bodies: ["IEEE"],
    year: 1997,
    identifiers: ["2.4 / 5 / 6 GHz", "20 / 40 / 80 / 160 / 320 MHz"],
    summary: {
      es: "La capa física de Wi-Fi convierte los bits en ondas de radio en las bandas de 2,4, 5 y 6 GHz. Cada generación (Wi-Fi 4, 5, 6, 7) ha agregado canales más anchos, más antenas y modulaciones más densas para ir más rápido y atender a más dispositivos a la vez.",
      en: "Wi-Fi's physical layer turns bits into radio waves in the 2.4, 5 and 6 GHz bands. Each generation (Wi-Fi 4, 5, 6, 7) has added wider channels, more antennas and denser modulations to go faster and serve more devices at once.",
    },
    analogy: {
      es: "Es como una autopista: un canal más ancho agrega carriles, más antenas (MIMO) agregan pisos, y una modulación más densa acomoda más pasajeros en cada coche, aunque para eso el camino debe estar despejado.",
      en: "It is like a highway: a wider channel adds lanes, more antennas (MIMO) add decks, and denser modulation packs more passengers per car, though that needs a clear road.",
    },
    everyday: {
      es: "La red Wi-Fi de tu casa; los nombres «Wi-Fi 6» o «Wi-Fi 7» de la caja del router se refieren a esta capa.",
      en: "Your home Wi-Fi; the “Wi-Fi 6” or “Wi-Fi 7” names on the router box refer to this layer.",
    },
    technical: [
      {
        es: "El 802.11 original (1997) ofrecía 1 y 2 Mb/s. 802.11b (1999) llegó a 11 Mb/s en 2,4 GHz con DSSS/CCK, y 802.11a (1999) a 54 Mb/s en 5 GHz con OFDM en canales de 20 MHz; 802.11g (2003) llevó ese OFDM a 2,4 GHz manteniendo compatibilidad con b. En 2,4 GHz solo caben tres canales de 20 MHz sin solapamiento (1, 6 y 11 en América).",
        en: "The original 802.11 (1997) offered 1 and 2 Mb/s. 802.11b (1999) reached 11 Mb/s at 2.4 GHz with DSSS/CCK, and 802.11a (1999) 54 Mb/s at 5 GHz with OFDM on 20 MHz channels; 802.11g (2003) brought that OFDM to 2.4 GHz while staying compatible with b. Only three non-overlapping 20 MHz channels fit in 2.4 GHz (1, 6 and 11 in the Americas).",
      },
      {
        es: "802.11n (2009), Wi-Fi 4, introdujo MIMO con hasta 4 flujos espaciales y canales de 40 MHz (hasta 600 Mb/s). 802.11ac (2013), Wi-Fi 5, solo en 5 GHz, amplió a 80/160 MHz, 256-QAM y MU-MIMO en el enlace descendente. 802.11ax (2021), Wi-Fi 6, añadió OFDMA para repartir un canal entre varios clientes, MU-MIMO en ambos sentidos, 1024-QAM y BSS coloring; Wi-Fi 6E es el mismo estándar extendido a la banda de 6 GHz.",
        en: "802.11n (2009), Wi-Fi 4, introduced MIMO with up to 4 spatial streams and 40 MHz channels (up to 600 Mb/s). 802.11ac (2013), Wi-Fi 5, 5 GHz only, widened to 80/160 MHz, 256-QAM and downlink MU-MIMO. 802.11ax (2021), Wi-Fi 6, added OFDMA to share one channel among several clients, MU-MIMO in both directions, 1024-QAM and BSS colouring; Wi-Fi 6E is the same standard extended into the 6 GHz band.",
      },
      {
        es: "802.11be, Wi-Fi 7, llega a canales de 320 MHz en 6 GHz, 4096-QAM y Multi-Link Operation (MLO), que permite usar varias bandas a la vez en una misma asociación. Los nombres «Wi-Fi N» son de la Wi-Fi Alliance, que certifica la interoperabilidad; el estándar técnico es IEEE 802.11. La tasa real depende de la relación señal/ruido: el equipo elige continuamente el índice MCS (modulación + código) que el enlace soporta.",
        en: "802.11be, Wi-Fi 7, reaches 320 MHz channels in 6 GHz, 4096-QAM and Multi-Link Operation (MLO), which lets one association use several bands at once. The “Wi-Fi N” names come from the Wi-Fi Alliance, which certifies interoperability; the technical standard is IEEE 802.11. The actual rate depends on the signal-to-noise ratio: devices continuously pick the MCS index (modulation + coding) the link can sustain.",
      },
    ],
    howItWorks: [
      { es: "Codificación: los bits se aleatorizan y se protegen con FEC (BCC o LDPC).", en: "Coding: bits are scrambled and protected with FEC (BCC or LDPC)." },
      { es: "Mapeo: grupos de bits se convierten en símbolos QAM (hasta 12 bits por símbolo con 4096-QAM).", en: "Mapping: groups of bits become QAM symbols (up to 12 bits per symbol with 4096-QAM)." },
      { es: "OFDM: los símbolos se reparten entre cientos de subportadoras y una IFFT genera la señal, con un intervalo de guarda contra los ecos.", en: "OFDM: symbols are spread across hundreds of subcarriers and an IFFT builds the signal, with a guard interval against echoes." },
      { es: "Preámbulo: cada trama empieza con campos de entrenamiento y señalización que indican al receptor el MCS, el ancho y el número de flujos.", en: "Preamble: each frame starts with training and signalling fields that tell the receiver the MCS, width and number of streams." },
      { es: "Adaptación: según los errores y la SNR, el emisor sube o baja el MCS en las tramas siguientes.", en: "Adaptation: based on errors and SNR, the sender raises or lowers the MCS for subsequent frames." },
    ],
    facts: [
      { label: { es: "Bandas", en: "Bands" }, value: "2.4 GHz, 5 GHz, 6 GHz" },
      { label: { es: "Wi-Fi 4 / 5 / 6 / 7", en: "Wi-Fi 4 / 5 / 6 / 7" }, value: "802.11n / ac / ax / be" },
      { label: { es: "Modulación máxima", en: "Highest modulation" }, value: { es: "4096-QAM (Wi-Fi 7)", en: "4096-QAM (Wi-Fi 7)" } },
      { label: { es: "Canal más ancho", en: "Widest channel" }, value: { es: "320 MHz (Wi-Fi 7, solo 6 GHz)", en: "320 MHz (Wi-Fi 7, 6 GHz only)" } },
      { label: { es: "Acceso múltiple", en: "Multiple access" }, value: { es: "OFDMA y MU-MIMO desde Wi-Fi 6", en: "OFDMA and MU-MIMO since Wi-Fi 6" } },
    ],
    security: {
      es: "La radio llega más allá de las paredes y cualquiera puede capturarla, así que la confidencialidad depende del cifrado de la capa MAC (WPA2/WPA3; en 6 GHz WPA3 es obligatorio). En la capa física, la amenaza es la interferencia intencional (jamming), que solo se combate localizando la fuente o cambiando de canal o de banda.",
      en: "Radio reaches beyond walls and anyone can capture it, so confidentiality relies on MAC-layer encryption (WPA2/WPA3; WPA3 is mandatory on 6 GHz). At the physical layer, the threat is intentional interference (jamming), which can only be fought by locating the source or changing channel or band.",
    },
    tools: [
      { command: "iw dev wlan0 link", description: { es: "Muestra señal, frecuencia y MCS/tasa del enlace actual", en: "Shows signal, frequency and MCS/bitrate of the current link" } },
      { command: "iw dev wlan0 scan", description: { es: "Lista redes cercanas con canal, ancho y capacidades HT/VHT/HE", en: "Lists nearby networks with channel, width and HT/VHT/HE capabilities" } },
      { command: "netsh wlan show interfaces", description: { es: "En Windows: canal, tipo de radio, señal y velocidad", en: "On Windows: channel, radio type, signal and rate" } },
    ],
    wireshark: "radiotap",
    relations: { usedBy: ["wifi-mac"] },
    specs: [
      { id: "IEEE 802.11-2024", url: "https://standards.ieee.org/ieee/802.11/10548/", title: { es: "LAN inalámbrica: MAC y capa física (revisión consolidada)", en: "Wireless LAN MAC and PHY (consolidated revision)" } },
      { id: "IEEE 802.11ax-2021", title: { es: "Alta eficiencia (Wi-Fi 6)", en: "High Efficiency WLAN (Wi-Fi 6)" } },
      { id: "IEEE 802.11be", title: { es: "Rendimiento extremadamente alto (Wi-Fi 7)", en: "Extremely High Throughput (Wi-Fi 7)" } },
    ],
  },
  {
    id: "bluetooth-phy",
    acronym: "Bluetooth PHY",
    fullName: { es: "Capa física de Bluetooth (BR/EDR y LE)", en: "Bluetooth physical layer (BR/EDR and LE)" },
    osi: [1],
    category: "wireless",
    status: "current",
    bodies: ["Bluetooth SIG"],
    year: 1999,
    identifiers: ["2.4 GHz ISM", "BR/EDR: 79 × 1 MHz", "LE: 40 × 2 MHz"],
    summary: {
      es: "Bluetooth es una radio de corto alcance en la banda de 2,4 GHz que salta rápidamente de frecuencia para convivir con Wi-Fi y otros equipos. Tiene dos variantes: Classic, para audio y transferencias continuas, y Low Energy, para sensores y dispositivos que funcionan meses con una pila.",
      en: "Bluetooth is a short-range radio in the 2.4 GHz band that hops rapidly between frequencies to coexist with Wi-Fi and other devices. It comes in two flavours: Classic, for audio and continuous transfers, and Low Energy, for sensors and devices that run for months on a battery.",
    },
    analogy: {
      es: "Como dos personas que conversan en una fiesta cambiando de sala cientos de veces por segundo siguiendo una lista que ambas conocen: si una sala está ruidosa, solo pierden una frase.",
      en: "Like two people talking at a party who change rooms hundreds of times per second following a list they both know: if one room is noisy, they lose just one sentence.",
    },
    everyday: {
      es: "Audífonos inalámbricos, relojes inteligentes, teclados, rastreadores de objetos y el manos libres del auto.",
      en: "Wireless earbuds, smartwatches, keyboards, item trackers and car hands-free kits.",
    },
    technical: [
      {
        es: "Bluetooth Classic (BR/EDR) usa 79 canales de 1 MHz entre 2402 y 2480 MHz con salto de frecuencia (FHSS) a 1600 saltos por segundo, uno por cada ranura de 625 µs. La secuencia la determinan la dirección y el reloj del dispositivo central, y desde la versión 1.2 el salto adaptativo (AFH) evita los canales ocupados. BR modula en GFSK a 1 Mb/s; EDR (versión 2.0) añade π/4-DQPSK a 2 Mb/s y 8DPSK a 3 Mb/s.",
        en: "Bluetooth Classic (BR/EDR) uses 79 channels of 1 MHz between 2402 and 2480 MHz with frequency hopping (FHSS) at 1600 hops per second, one per 625 µs slot. The sequence is derived from the central device's address and clock, and since version 1.2 adaptive hopping (AFH) avoids busy channels. BR modulates GFSK at 1 Mb/s; EDR (version 2.0) adds π/4-DQPSK at 2 Mb/s and 8DPSK at 3 Mb/s.",
      },
      {
        es: "Bluetooth Low Energy, introducido en la versión 4.0 (2010), es una radio distinta e incompatible con Classic: 40 canales de 2 MHz, de los cuales 3 (37, 38 y 39, en 2402, 2426 y 2480 MHz) se usan para anuncios y descubrimiento y 37 para datos. Modula en GFSK a 1 Mb/s y salta de canal en cada evento de conexión. La versión 5.0 (2016) añadió LE 2M (2 Mb/s) y LE Coded, que con codificación FEC baja a 500 o 125 kb/s a cambio de hasta unas cuatro veces más alcance.",
        en: "Bluetooth Low Energy, introduced in version 4.0 (2010), is a different radio incompatible with Classic: 40 channels of 2 MHz, 3 of which (37, 38 and 39, at 2402, 2426 and 2480 MHz) are used for advertising and discovery and 37 for data. It modulates GFSK at 1 Mb/s and hops channel on every connection event. Version 5.0 (2016) added LE 2M (2 Mb/s) and LE Coded, which uses FEC to drop to 500 or 125 kb/s in exchange for up to roughly four times the range.",
      },
      {
        es: "La especificación la mantiene el Bluetooth SIG como un único documento, la Core Specification, que abarca radio, banda base, capa de enlace y protocolos superiores; la capa física es solo la parte «Radio». Muchos chips son de modo dual y soportan Classic y LE a la vez.",
        en: "The Bluetooth SIG maintains the specification as a single document, the Core Specification, which covers radio, baseband, link layer and upper protocols; the physical layer is only its “Radio” part. Many chips are dual-mode and support Classic and LE at once.",
      },
    ],
    howItWorks: [
      { es: "Anuncio (LE): el periférico emite paquetes en los canales 37, 38 y 39 a intervalos regulares.", en: "Advertising (LE): the peripheral sends packets on channels 37, 38 and 39 at regular intervals." },
      { es: "Descubrimiento: el central escanea esos canales y, si le interesa, envía una solicitud de conexión con el mapa de canales y los parámetros de salto.", en: "Discovery: the central scans those channels and, if interested, sends a connection request with the channel map and hopping parameters." },
      { es: "Conexión: ambos saltan de canal en cada evento de conexión según el algoritmo de selección acordado.", en: "Connection: both hop channel on each connection event according to the agreed selection algorithm." },
      { es: "Adaptación: el central actualiza el mapa de canales para excluir los que tienen interferencia (por ejemplo, los que ocupa una red Wi-Fi).", en: "Adaptation: the central updates the channel map to exclude those with interference (e.g. those used by a Wi-Fi network)." },
    ],
    facts: [
      { label: { es: "Banda", en: "Band" }, value: "2.4 GHz ISM (2402–2480 MHz)" },
      { label: { es: "Classic (BR/EDR)", en: "Classic (BR/EDR)" }, value: { es: "79 canales de 1 MHz, 1600 saltos/s, 1–3 Mb/s", en: "79 × 1 MHz channels, 1600 hops/s, 1–3 Mb/s" } },
      { label: { es: "Low Energy", en: "Low Energy" }, value: { es: "40 canales de 2 MHz (3 de anuncio)", en: "40 × 2 MHz channels (3 advertising)" } },
      { label: { es: "PHY de LE", en: "LE PHYs" }, value: "LE 1M, LE 2M, LE Coded (500 / 125 kb/s)" },
      { label: { es: "Modulación", en: "Modulation" }, value: "GFSK, π/4-DQPSK, 8DPSK" },
    ],
    security: {
      es: "El salto de frecuencia no es una medida de seguridad: con un sniffer adecuado se puede seguir una conexión. La protección está en las capas superiores (emparejamiento y cifrado AES-CCM), y ataques como KNOB (2019) mostraron debilidades en la negociación de claves de BR/EDR, corregidas en la especificación y en los firmwares.",
      en: "Frequency hopping is not a security measure: a suitable sniffer can follow a connection. Protection lives in the upper layers (pairing and AES-CCM encryption), and attacks such as KNOB (2019) exposed weaknesses in BR/EDR key negotiation, since fixed in the specification and in firmware.",
    },
    tools: [
      { command: "bluetoothctl", description: { es: "Escanea, empareja y conecta dispositivos en Linux (BlueZ)", en: "Scans, pairs and connects devices on Linux (BlueZ)" } },
      { command: "btmon", description: { es: "Muestra el tráfico HCI entre el sistema y el controlador Bluetooth", en: "Shows HCI traffic between the host and the Bluetooth controller" } },
    ],
    wireshark: "btle",
    specs: [
      { id: "Bluetooth Core Specification", title: { es: "Especificación central de Bluetooth (volumen Radio)", en: "Bluetooth Core Specification (Radio volume)" } },
    ],
  },
  {
    id: "dsl",
    acronym: "DSL",
    fullName: { es: "Línea de Abonado Digital (ADSL, VDSL2, G.fast)", en: "Digital Subscriber Line (ADSL, VDSL2, G.fast)" },
    osi: [1],
    category: "access",
    status: "current",
    bodies: ["ITU-T"],
    year: 1999,
    identifiers: ["ADSL: hasta 1,1 MHz", "ADSL2+: 2,2 MHz", "VDSL2: hasta 35 MHz", "G.fast: 106 / 212 MHz"],
    summary: {
      es: "DSL lleva internet de banda ancha por la misma línea telefónica de cobre de toda la vida, usando frecuencias mucho más altas que la voz. Cuanto más lejos está tu casa de la central o del gabinete, menor es la velocidad que se puede lograr.",
      en: "DSL delivers broadband Internet over the same old copper telephone line, using frequencies far above voice. The farther your home is from the exchange or street cabinet, the lower the achievable speed.",
    },
    analogy: {
      es: "Como un cable por el que viajan a la vez tonos graves (la voz) y agudos (los datos): un filtro separa unos de otros en cada extremo.",
      en: "Like a wire carrying low tones (voice) and high tones (data) at the same time: a filter separates them at each end.",
    },
    everyday: {
      es: "El «internet por línea telefónica» con módem ADSL o VDSL que aún ofrecen muchos operadores donde no llega la fibra.",
      en: "“Internet over the phone line” with an ADSL or VDSL modem, still offered by many carriers where fibre has not arrived.",
    },
    technical: [
      {
        es: "Todas las variantes modernas usan DMT (Discrete MultiTone): el espectro se divide en subportadoras de 4,3125 kHz y cada una recibe una cantidad de bits según su relación señal/ruido (bit loading). ADSL (ITU-T G.992.1, 1999) usa 256 tonos hasta 1,104 MHz, con unos 8 Mb/s de bajada; ADSL2+ (G.992.5) duplica el espectro a 2,2 MHz y llega a unos 24 Mb/s en líneas cortas. Un splitter o microfiltro separa la telefonía analógica, que ocupa los primeros kHz.",
        en: "All modern variants use DMT (Discrete MultiTone): the spectrum is split into 4.3125 kHz subcarriers and each gets a number of bits according to its signal-to-noise ratio (bit loading). ADSL (ITU-T G.992.1, 1999) uses 256 tones up to 1.104 MHz, giving about 8 Mb/s downstream; ADSL2+ (G.992.5) doubles the spectrum to 2.2 MHz and reaches about 24 Mb/s on short lines. A splitter or microfilter separates analogue telephony, which occupies the first few kHz.",
      },
      {
        es: "La atenuación del cobre crece con la frecuencia y la distancia, así que los tonos altos solo sirven en bucles cortos: por eso la velocidad cae rápido con los kilómetros. VDSL2 (G.993.2, 2006) usa hasta 30 MHz (35 MHz en el perfil 35b) y se alimenta desde gabinetes con fibra cerca del abonado; el vectoring (G.993.5) cancela la diafonía entre pares del mismo cable. G.fast (G.9701, 2014) usa 106 o 212 MHz con dúplex por división de tiempo y ofrece cientos de Mb/s en pocos cientos de metros.",
        en: "Copper attenuation grows with frequency and distance, so high tones only work on short loops: that is why speed falls quickly with kilometres. VDSL2 (G.993.2, 2006) uses up to 30 MHz (35 MHz in profile 35b) and is fed from fibre-connected cabinets near the subscriber; vectoring (G.993.5) cancels crosstalk between pairs in the same cable. G.fast (G.9701, 2014) uses 106 or 212 MHz with time-division duplexing and delivers hundreds of Mb/s over a few hundred metres.",
      },
      {
        es: "El módem del abonado se conecta al DSLAM (o DPU en G.fast) del operador. Encima de DSL, ADSL suele transportar ATM y VDSL2 transporta Ethernet directamente (PTM); en ambos casos el acceso a internet se autentica frecuentemente con PPPoE.",
        en: "The subscriber's modem connects to the carrier's DSLAM (or DPU for G.fast). On top of DSL, ADSL usually carries ATM while VDSL2 carries Ethernet directly (PTM); in both cases Internet access is often authenticated with PPPoE.",
      },
    ],
    howItWorks: [
      { es: "Handshake: módem y DSLAM negocian el modo y las capacidades con G.994.1 (G.hs).", en: "Handshake: modem and DSLAM negotiate mode and capabilities with G.994.1 (G.hs)." },
      { es: "Entrenamiento: se envían señales de prueba para medir la atenuación y el ruido de cada subportadora.", en: "Training: test signals are sent to measure attenuation and noise on every subcarrier." },
      { es: "Bit loading: se asigna a cada tono el número de bits que soporta, dejando un margen de SNR.", en: "Bit loading: each tone is assigned the number of bits it supports, keeping an SNR margin." },
      { es: "Showtime: la línea queda sincronizada y transporta datos; el margen y los errores se vigilan en continuo.", en: "Showtime: the line is synchronised and carries data; margin and errors are monitored continuously." },
    ],
    facts: [
      { label: { es: "Modulación", en: "Modulation" }, value: "DMT (OFDM)" },
      { label: { es: "ADSL / ADSL2+", en: "ADSL / ADSL2+" }, value: { es: "~8 / ~24 Mb/s de bajada", en: "~8 / ~24 Mb/s downstream" } },
      { label: { es: "VDSL2", en: "VDSL2" }, value: { es: "Hasta 30 MHz (35b: 35 MHz), con vectoring", en: "Up to 30 MHz (35b: 35 MHz), with vectoring" } },
      { label: { es: "G.fast", en: "G.fast" }, value: { es: "106 / 212 MHz, TDD, bucles muy cortos", en: "106 / 212 MHz, TDD, very short loops" } },
      { label: { es: "Asimétrico", en: "Asymmetric" }, value: { es: "Sí, más bajada que subida", en: "Yes, more downstream than upstream" } },
    ],
    relations: { dependsOn: ["tia-568"], usedBy: ["atm", "pppoe", "ppp", "ethernet"] },
    specs: [
      { id: "ITU-T G.992.1", title: { es: "ADSL", en: "Asymmetric digital subscriber line (ADSL) transceivers" }, url: itu("G.992.1") },
      { id: "ITU-T G.992.5", title: { es: "ADSL2+ (espectro extendido)", en: "ADSL2 extended bandwidth (ADSL2plus)" }, url: itu("G.992.5") },
      { id: "ITU-T G.993.2", title: { es: "VDSL2", en: "Very high speed digital subscriber line transceivers 2 (VDSL2)" }, url: itu("G.993.2") },
      { id: "ITU-T G.9701", title: { es: "G.fast", en: "Fast access to subscriber terminals (G.fast)" }, url: itu("G.9701") },
    ],
  },
  {
    id: "docsis",
    acronym: "DOCSIS",
    fullName: { es: "Especificación de Interfaz de Servicio de Datos por Cable", en: "Data Over Cable Service Interface Specification" },
    osi: [1, 2],
    category: "access",
    status: "current",
    bodies: ["CableLabs", "ITU-T"],
    year: 1997,
    identifiers: ["HFC", "6 / 8 MHz (SC-QAM)", "OFDM hasta 192 MHz / up to 192 MHz"],
    summary: {
      es: "DOCSIS es el estándar que permite dar internet por la red de cable coaxial de la televisión de paga. El cablemódem de tu casa comparte el cable con los de tus vecinos, y un equipo del operador (el CMTS) reparte el tiempo y el ancho de banda entre todos.",
      en: "DOCSIS is the standard that delivers Internet over the pay-TV coaxial cable network. The cable modem in your home shares the cable with your neighbours' modems, and a carrier device (the CMTS) shares time and bandwidth among all of them.",
    },
    analogy: {
      es: "Como un edificio con un solo elevador: el CMTS es el operador que decide en qué turno sube cada vecino, para que nunca se amontonen.",
      en: "Like a building with a single elevator: the CMTS is the operator who decides when each resident rides, so they never pile up.",
    },
    everyday: {
      es: "El módem de cable coaxial que instala tu compañía de televisión e internet.",
      en: "The coaxial cable modem installed by your TV and Internet provider.",
    },
    technical: [
      {
        es: "DOCSIS opera sobre redes híbridas de fibra y coaxial (HFC). DOCSIS 1.0 (1997) usaba un canal de bajada de 6 MHz con 64/256-QAM y subida TDMA compartida; 1.1 añadió QoS y 2.0 subidas más rápidas. DOCSIS 3.0 (2006) introdujo el agrupamiento de canales (channel bonding) para sumar varios canales de 6 MHz (8 MHz en EuroDOCSIS), cada uno de unos 38 Mb/s con 256-QAM en la versión norteamericana, y soporte de IPv6.",
        en: "DOCSIS runs over hybrid fibre-coax (HFC) networks. DOCSIS 1.0 (1997) used a 6 MHz downstream channel with 64/256-QAM and a shared TDMA upstream; 1.1 added QoS and 2.0 faster upstreams. DOCSIS 3.0 (2006) introduced channel bonding to combine several 6 MHz channels (8 MHz in EuroDOCSIS), each about 38 Mb/s with 256-QAM in the North American version, plus IPv6 support.",
      },
      {
        es: "DOCSIS 3.1 (2013) cambió a OFDM en bajada, con bloques de hasta 192 MHz, modulación de hasta 4096-QAM y FEC LDPC, y a OFDMA en subida, para alcanzar unos 10 Gb/s de bajada. DOCSIS 4.0 amplía el espectro a 1,8 GHz (Extended Spectrum) o permite usar las mismas frecuencias en ambos sentidos a la vez (Full Duplex), elevando mucho la capacidad de subida. La ITU-T adoptó las versiones como recomendaciones, por ejemplo J.112 (1.x) y J.222 (3.0).",
        en: "DOCSIS 3.1 (2013) moved to OFDM downstream, in blocks of up to 192 MHz, modulation up to 4096-QAM and LDPC FEC, and to OFDMA upstream, reaching about 10 Gb/s downstream. DOCSIS 4.0 extends the spectrum to 1.8 GHz (Extended Spectrum) or lets the same frequencies be used in both directions at once (Full Duplex), greatly raising upstream capacity. The ITU-T adopted the versions as recommendations, for example J.112 (1.x) and J.222 (3.0).",
      },
      {
        es: "La capa MAC es centralizada: el CMTS envía mensajes MAP que asignan a cada módem ranuras de subida, y los módems piden ancho de banda en ranuras de contención. Las tramas transportan Ethernet (IEEE 802.3) con una cabecera DOCSIS, y el tráfico se cifra entre módem y CMTS con BPI+ (Baseline Privacy Interface Plus).",
        en: "The MAC layer is centralised: the CMTS sends MAP messages that grant each modem upstream slots, and modems request bandwidth in contention slots. Frames carry Ethernet (IEEE 802.3) with a DOCSIS header, and traffic between modem and CMTS is encrypted with BPI+ (Baseline Privacy Interface Plus).",
      },
    ],
    howItWorks: [
      { es: "Búsqueda: el módem explora frecuencias de bajada hasta sincronizarse con un canal DOCSIS.", en: "Scan: the modem sweeps downstream frequencies until it locks onto a DOCSIS channel." },
      { es: "Parámetros: aprende los canales de subida (UCD) y recibe los MAP de asignación.", en: "Parameters: it learns the upstream channels (UCD) and receives allocation MAPs." },
      { es: "Ranging: ajusta potencia, frecuencia y temporización según la distancia al CMTS.", en: "Ranging: it adjusts power, frequency and timing for its distance to the CMTS." },
      { es: "Aprovisionamiento: obtiene IP por DHCP y descarga su archivo de configuración por TFTP.", en: "Provisioning: it gets an IP via DHCP and downloads its configuration file via TFTP." },
      { es: "Registro: se registra en el CMTS, negocia claves BPI+ y empieza a transportar tráfico del cliente.", en: "Registration: it registers with the CMTS, negotiates BPI+ keys and starts carrying customer traffic." },
    ],
    facts: [
      { label: { es: "Red", en: "Network" }, value: { es: "HFC (fibra + coaxial)", en: "HFC (fibre + coax)" } },
      { label: { es: "DOCSIS 3.0", en: "DOCSIS 3.0" }, value: { es: "Channel bonding de canales SC-QAM", en: "Bonding of SC-QAM channels" } },
      { label: { es: "DOCSIS 3.1", en: "DOCSIS 3.1" }, value: { es: "OFDM/OFDMA, hasta 4096-QAM, ~10 Gb/s de bajada", en: "OFDM/OFDMA, up to 4096-QAM, ~10 Gb/s downstream" } },
      { label: { es: "DOCSIS 4.0", en: "DOCSIS 4.0" }, value: { es: "Espectro a 1,8 GHz o Full Duplex", en: "1.8 GHz spectrum or Full Duplex" } },
      { label: { es: "Cifrado", en: "Encryption" }, value: "BPI+" },
    ],
    security: {
      es: "El medio es compartido: sin BPI+ un módem podría ver el tráfico de bajada de sus vecinos. BPI+ cifra el enlace y autentica los módems con certificados X.509; históricamente, la manipulación de archivos de configuración y la clonación de MAC se usaron para robar servicio o velocidad.",
      en: "The medium is shared: without BPI+ a modem could see its neighbours' downstream traffic. BPI+ encrypts the link and authenticates modems with X.509 certificates; historically, tampered configuration files and cloned MACs were used to steal service or speed.",
    },
    multiLayerNote: {
      es: "DOCSIS define tanto la capa física (modulación, canales, RF sobre coaxial) como la capa de enlace (MAC con asignación de ranuras, cifrado BPI+ y encapsulación de tramas Ethernet), por eso abarca L1 y L2.",
      en: "DOCSIS defines both the physical layer (modulation, channels, RF over coax) and the data link layer (slot-granting MAC, BPI+ encryption and Ethernet frame encapsulation), so it spans L1 and L2.",
    },
    wireshark: "docsis",
    relations: { dependsOn: ["dhcp", "tftp"], usedBy: ["ethernet", "ipv4", "ipv6"] },
    specs: [
      { id: "CableLabs DOCSIS 3.1", title: { es: "Especificaciones DOCSIS 3.1 (PHY y MULPI)", en: "DOCSIS 3.1 specifications (PHY and MULPI)" } },
      { id: "CableLabs DOCSIS 4.0", title: { es: "Especificaciones DOCSIS 4.0", en: "DOCSIS 4.0 specifications" } },
      { id: "ITU-T J.222", title: { es: "Sistemas de cablemódem de tercera generación (DOCSIS 3.0)", en: "Third-generation transmission systems for interactive cable television services (DOCSIS 3.0)" }, url: itu("J.222") },
    ],
  },
  {
    id: "sonet-sdh",
    acronym: "SONET/SDH",
    fullName: { es: "Red Óptica Síncrona / Jerarquía Digital Síncrona", en: "Synchronous Optical Network / Synchronous Digital Hierarchy" },
    osi: [1],
    category: "wan",
    status: "legacy",
    bodies: ["ITU-T"],
    year: 1988,
    identifiers: ["STS-1 51,84 Mb/s", "STM-1 / OC-3 155,52 Mb/s", "8000 tramas/s"],
    summary: {
      es: "SONET (en Norteamérica) y SDH (en el resto del mundo) son los sistemas con los que los operadores transportaron durante décadas la telefonía y los datos por fibra óptica entre ciudades. Todo va sincronizado a un reloj común y organizado en anillos que se recuperan de un corte en milisegundos.",
      en: "SONET (in North America) and SDH (elsewhere) are the systems carriers used for decades to move telephony and data over fibre between cities. Everything is synchronised to a common clock and organised in rings that recover from a cut within milliseconds.",
    },
    analogy: {
      es: "Como un tren que sale exactamente cada 125 microsegundos con vagones de tamaño fijo: cada cliente tiene reservados sus asientos en todos los viajes.",
      en: "Like a train that departs exactly every 125 microseconds with fixed-size carriages: each customer has reserved seats on every trip.",
    },
    everyday: {
      es: "No lo ves directamente, pero sostuvo por años las redes telefónicas y los enlaces dedicados E1/T1 de empresas y bancos.",
      en: "You do not see it directly, but for years it carried telephone networks and the dedicated E1/T1 lines of companies and banks.",
    },
    technical: [
      {
        es: "SONET se publicó como ANSI T1.105 (1988) y SDH como ITU-T G.707; son compatibles a partir de STM-1 = STS-3 = OC-3 = 155,52 Mb/s. La unidad básica de SONET, STS-1, es una trama de 9 filas × 90 columnas (810 B) enviada 8000 veces por segundo: 810 × 8 × 8000 = 51,84 Mb/s. Los niveles superiores multiplexan por 4: STM-4/OC-12 (622,08 Mb/s), STM-16/OC-48 (2,5 Gb/s), STM-64/OC-192 (10 Gb/s) y STM-256/OC-768 (40 Gb/s).",
        en: "SONET was published as ANSI T1.105 (1988) and SDH as ITU-T G.707; they interoperate from STM-1 = STS-3 = OC-3 = 155.52 Mb/s. SONET's basic unit, STS-1, is a 9-row × 90-column frame (810 B) sent 8000 times per second: 810 × 8 × 8000 = 51.84 Mb/s. Higher levels multiplex by 4: STM-4/OC-12 (622.08 Mb/s), STM-16/OC-48 (2.5 Gb/s), STM-64/OC-192 (10 Gb/s) and STM-256/OC-768 (40 Gb/s).",
      },
      {
        es: "Cada trama tiene bytes de overhead de sección, de línea (multiplexación) y de trayecto, que llevan paridad para vigilar errores, canales de gestión y punteros que permiten que la carga útil «flote» dentro de la trama para absorber pequeñas diferencias de reloj. Al ser síncrono, se puede extraer un tributario (E1, T1, E3…) sin demultiplexar toda la señal, a diferencia de la antigua jerarquía PDH.",
        en: "Each frame carries section, line (multiplex) and path overhead bytes, holding parity for error monitoring, management channels and pointers that let the payload “float” inside the frame to absorb small clock differences. Being synchronous, a tributary (E1, T1, E3…) can be dropped without demultiplexing the whole signal, unlike the older PDH hierarchy.",
      },
      {
        es: "Su gran aporte fue la protección: anillos (UPSR/BLSR en SONET, SNCP/MS-SPRing en SDH) y esquemas 1+1 que conmutan a la ruta de respaldo en 50 ms. Transportaba voz, ATM, paquetes IP con PPP (Packet over SONET) y, con GFP, Ethernet. Hoy lo están reemplazando OTN (ITU-T G.709), con FEC y capacidad de 100 Gb/s y más, y el transporte directo de Ethernet sobre DWDM.",
        en: "Its great contribution was protection: rings (UPSR/BLSR in SONET, SNCP/MS-SPRing in SDH) and 1+1 schemes that switch to the backup path within 50 ms. It carried voice, ATM, IP packets via PPP (Packet over SONET) and, with GFP, Ethernet. It is now being replaced by OTN (ITU-T G.709), with FEC and 100 Gb/s-plus capacity, and by Ethernet carried directly over DWDM.",
      },
    ],
    facts: [
      { label: { es: "Trama", en: "Frame" }, value: { es: "125 µs (8000 tramas/s)", en: "125 µs (8000 frames/s)" } },
      { label: { es: "STS-1", en: "STS-1" }, value: "51.84 Mb/s" },
      { label: { es: "STM-1 = OC-3", en: "STM-1 = OC-3" }, value: "155.52 Mb/s" },
      { label: { es: "Protección", en: "Protection" }, value: { es: "Conmutación en 50 ms (anillos, 1+1)", en: "50 ms switchover (rings, 1+1)" } },
      { label: { es: "Sucesor", en: "Successor" }, value: { es: "OTN (ITU-T G.709) y Ethernet", en: "OTN (ITU-T G.709) and Ethernet" } },
    ],
    tools: [
      { command: "show controllers sonet 0/0/0", description: { es: "En routers Cisco IOS: alarmas (LOS, LOF, AIS) y contadores de errores B1/B2/B3", en: "On Cisco IOS routers: alarms (LOS, LOF, AIS) and B1/B2/B3 error counters" } },
    ],
    relations: { usedBy: ["ppp", "atm", "hdlc", "ethernet"] },
    specs: [
      { id: "ITU-T G.707", title: { es: "Interfaz de nodo de red para SDH", en: "Network node interface for the synchronous digital hierarchy (SDH)" }, url: itu("G.707") },
      { id: "ANSI T1.105", title: { es: "SONET: formatos y velocidades", en: "SONET: basic description including multiplex structure, rates and formats" } },
      { id: "ITU-T G.709", title: { es: "Interfaces de la red de transporte óptica (OTN)", en: "Interfaces for the optical transport network (OTN)" }, url: itu("G.709") },
    ],
  },
  {
    id: "poe",
    acronym: "PoE",
    fullName: { es: "Alimentación a través de Ethernet", en: "Power over Ethernet" },
    osi: [1],
    category: "power",
    status: "current",
    bodies: ["IEEE"],
    year: 2003,
    identifiers: ["802.3af 15,4 W", "802.3at 30 W", "802.3bt 60 / 90 W"],
    summary: {
      es: "PoE lleva energía eléctrica por el mismo cable de red que transporta los datos, así que un teléfono IP, una cámara o un punto de acceso Wi-Fi funcionan sin enchufe propio. El switch detecta primero si el equipo lo acepta, para no dañar a los que no lo soportan.",
      en: "PoE carries electrical power over the same network cable that carries the data, so an IP phone, camera or Wi-Fi access point runs without its own power outlet. The switch first checks whether the device accepts it, so it does not harm devices that do not support it.",
    },
    analogy: {
      es: "Como una manguera que, además de agua, trae un cable de luz: antes de encender, el switch «toca la puerta» para confirmar que del otro lado hay alguien esperando energía.",
      en: "Like a hose that brings a power line along with the water: before switching on, the switch “knocks on the door” to confirm someone on the other side expects power.",
    },
    everyday: {
      es: "Los teléfonos de escritorio de la oficina, las cámaras de seguridad IP y los puntos de acceso Wi-Fi en el techo.",
      en: "Office desk phones, IP security cameras and ceiling-mounted Wi-Fi access points.",
    },
    technical: [
      {
        es: "El equipo que alimenta (PSE, normalmente el switch) entrega corriente continua de unos 44–57 V al equipo alimentado (PD). IEEE 802.3af (2003) ofrece 15,4 W en el PSE, de los que llegan 12,95 W al PD tras las pérdidas de 100 m de cable. 802.3at (2009), PoE+, sube a 30 W en el PSE (25,5 W en el PD). Ambos usan dos pares: los de datos (alternativa A) o los libres de 10/100 (alternativa B).",
        en: "The powering device (PSE, usually the switch) supplies roughly 44–57 V DC to the powered device (PD). IEEE 802.3af (2003) delivers 15.4 W at the PSE, of which 12.95 W reach the PD after losses over 100 m of cable. 802.3at (2009), PoE+, raises that to 30 W at the PSE (25.5 W at the PD). Both use two pairs: the data pairs (alternative A) or the pairs spare in 10/100 (alternative B).",
      },
      {
        es: "802.3bt (2018) usa los cuatro pares: Tipo 3 hasta 60 W y Tipo 4 hasta 90 W en el PSE (unos 51 y 71 W en el PD), suficiente para pantallas, iluminación LED o puntos de acceso Wi-Fi 6/7. A esas potencias el calentamiento de los haces de cable importa y conviene usar cable de mayor calibre. La potencia fluye en modo común por los transformadores de acoplamiento, así que no interfiere con los datos.",
        en: "802.3bt (2018) uses all four pairs: Type 3 up to 60 W and Type 4 up to 90 W at the PSE (about 51 and 71 W at the PD), enough for displays, LED lighting or Wi-Fi 6/7 access points. At those levels cable-bundle heating matters and thicker-gauge cable is advisable. Power flows in common mode through the coupling transformers, so it does not interfere with data.",
      },
      {
        es: "Antes de dar energía, el PSE aplica un voltaje bajo y busca la firma de detección de 25 kΩ del PD; luego, en la clasificación, el PD indica cuánta potencia necesita (clases 0–4 en af/at, 0–8 en bt). Opcionalmente, LLDP permite renegociar la potencia con más precisión durante la operación. Existen también variantes propietarias previas o paralelas, como UPOE de Cisco, y el «PoE pasivo», que no hace detección y puede dañar equipos.",
        en: "Before applying power, the PSE applies a low voltage and looks for the PD's 25 kΩ detection signature; then, during classification, the PD states how much power it needs (classes 0–4 in af/at, 0–8 in bt). Optionally, LLDP lets power be renegotiated more precisely during operation. There are also earlier or parallel proprietary variants, such as Cisco UPOE, and “passive PoE”, which does no detection and can damage devices.",
      },
    ],
    howItWorks: [
      { es: "Detección: el PSE aplica unos pocos voltios y mide la resistencia; solo sigue si encuentra la firma de ~25 kΩ.", en: "Detection: the PSE applies a few volts and measures resistance; it proceeds only if it finds the ~25 kΩ signature." },
      { es: "Clasificación: el PD consume una corriente característica que indica su clase de potencia.", en: "Classification: the PD draws a characteristic current that signals its power class." },
      { es: "Encendido: el PSE eleva el voltaje al nivel de operación y lo mantiene mientras vigila el consumo.", en: "Power-up: the PSE raises voltage to the operating level and keeps it there while monitoring draw." },
      { es: "Desconexión: si el PD deja de presentar su firma de mantenimiento, el PSE corta la energía.", en: "Disconnect: if the PD stops presenting its maintain-power signature, the PSE cuts power." },
    ],
    facts: [
      { label: { es: "802.3af (2003)", en: "802.3af (2003)" }, value: { es: "15,4 W en PSE / 12,95 W en PD", en: "15.4 W at PSE / 12.95 W at PD" } },
      { label: { es: "802.3at PoE+ (2009)", en: "802.3at PoE+ (2009)" }, value: { es: "30 W en PSE / 25,5 W en PD", en: "30 W at PSE / 25.5 W at PD" } },
      { label: { es: "802.3bt (2018)", en: "802.3bt (2018)" }, value: { es: "Tipo 3: 60 W, Tipo 4: 90 W en PSE (4 pares)", en: "Type 3: 60 W, Type 4: 90 W at PSE (4 pairs)" } },
      { label: { es: "Detección", en: "Detection" }, value: { es: "Firma de 25 kΩ", en: "25 kΩ signature" } },
      { label: { es: "Voltaje", en: "Voltage" }, value: { es: "~44–57 V CC", en: "~44–57 V DC" } },
    ],
    tools: [
      { command: "show power inline", description: { es: "En switches Cisco: potencia entregada y clase de cada puerto", en: "On Cisco switches: power delivered and class per port" } },
      { command: "ethtool --show-pse eth0", description: { es: "Estado PoE de un puerto con controlador PSE soportado en Linux", en: "PoE state of a port with a supported PSE controller on Linux" } },
    ],
    relations: { dependsOn: ["tia-568", "lldp"] },
    specs: [
      { id: "IEEE 802.3af-2003", title: { es: "Alimentación por MDI (PoE)", en: "DTE Power via MDI (PoE)" } },
      { id: "IEEE 802.3at-2009", title: { es: "Alimentación por MDI mejorada (PoE+)", en: "DTE Power via MDI Enhancements (PoE+)" } },
      { id: "IEEE 802.3bt-2018", title: { es: "Alimentación por MDI sobre 4 pares", en: "Power over Ethernet over 4 pairs" } },
    ],
  },
  {
    id: "tia-568",
    acronym: "TIA-568",
    fullName: { es: "Norma de cableado estructurado de telecomunicaciones", en: "Commercial building telecommunications cabling standard" },
    osi: [1],
    category: "cabling",
    status: "current",
    bodies: ["ANSI/TIA", "ISO/IEC"],
    year: 1991,
    identifiers: ["T568A / T568B", "Cat5e / Cat6 / Cat6A / Cat8", "90 m + 10 m"],
    summary: {
      es: "TIA-568 es la norma que dice cómo debe instalarse el cableado de red de un edificio: qué categorías de cable usar, cómo conectar cada hilo en el conector RJ45 y cuánto puede medir un enlace. Seguirla garantiza que Ethernet funcione a la velocidad esperada.",
      en: "TIA-568 is the standard that says how a building's network cabling must be installed: which cable categories to use, how to wire each conductor in the RJ45 connector and how long a link may be. Following it ensures Ethernet runs at the expected speed.",
    },
    analogy: {
      es: "Es el código de construcción de la red: igual que las normas eléctricas fijan el calibre y los colores de los cables de una casa, TIA-568 fija los del cableado de datos.",
      en: "It is the network's building code: just as electrical codes set the gauge and colours of a home's wires, TIA-568 sets those of data cabling.",
    },
    everyday: {
      es: "Los colores del cable al ponchar un conector RJ45 y la etiqueta «Cat6» impresa en la cubierta del cable.",
      en: "The wire colours when crimping an RJ45 plug and the “Cat6” marking printed on the cable jacket.",
    },
    technical: [
      {
        es: "La primera edición, EIA/TIA-568, es de 1991; le siguieron las revisiones A, B, C, D y E, que hoy dividen la norma en partes (requisitos generales, cobre de par trenzado, fibra óptica). Su equivalente internacional es ISO/IEC 11801, que usa «clases» de canal (D, E, EA, I/II) donde TIA usa «categorías» de componente (Cat5e, Cat6, Cat6A, Cat8).",
        en: "The first edition, EIA/TIA-568, dates from 1991; revisions A, B, C, D and E followed, and the standard is now split into parts (general requirements, balanced twisted pair, optical fibre). Its international equivalent is ISO/IEC 11801, which uses channel “classes” (D, E, EA, I/II) where TIA uses component “categories” (Cat5e, Cat6, Cat6A, Cat8).",
      },
      {
        es: "Cada categoría fija la frecuencia hasta la que se garantizan atenuación, diafonía y pérdidas de retorno: Cat5e 100 MHz (1000BASE-T), Cat6 250 MHz, Cat6A 500 MHz (10GBASE-T a 100 m) y Cat8 2000 MHz, pensada para 25G/40GBASE-T en canales de solo 30 m dentro del centro de datos. Cat7 no es una categoría TIA; solo existe como clase F en ISO/IEC.",
        en: "Each category sets the frequency up to which attenuation, crosstalk and return loss are guaranteed: Cat5e 100 MHz (1000BASE-T), Cat6 250 MHz, Cat6A 500 MHz (10GBASE-T at 100 m) and Cat8 2000 MHz, intended for 25G/40GBASE-T over channels of only 30 m inside the data centre. Cat7 is not a TIA category; it exists only as ISO/IEC class F.",
      },
      {
        es: "El canal de cobre máximo es de 100 m: hasta 90 m de enlace permanente (del panel de parcheo a la roseta) más hasta 10 m de cables de parcheo en ambos extremos. Define dos asignaciones de pines para el RJ45 (T568A y T568B) que solo intercambian los pares verde y naranja; un cable con la misma asignación en ambos extremos es directo, y uno con A en un extremo y B en el otro es cruzado.",
        en: "The maximum copper channel is 100 m: up to 90 m of permanent link (patch panel to wall outlet) plus up to 10 m of patch cords at both ends. It defines two RJ45 pin assignments (T568A and T568B) that only swap the green and orange pairs; a cable with the same assignment at both ends is straight-through, and one with A at one end and B at the other is a crossover.",
      },
    ],
    facts: [
      { label: { es: "T568A (pines 1–8)", en: "T568A (pins 1–8)" }, value: { es: "bl/verde, verde, bl/naranja, azul, bl/azul, naranja, bl/café, café", en: "wh/green, green, wh/orange, blue, wh/blue, orange, wh/brown, brown" } },
      { label: { es: "T568B (pines 1–8)", en: "T568B (pins 1–8)" }, value: { es: "bl/naranja, naranja, bl/verde, azul, bl/azul, verde, bl/café, café", en: "wh/orange, orange, wh/green, blue, wh/blue, green, wh/brown, brown" } },
      { label: { es: "Canal máximo", en: "Maximum channel" }, value: { es: "100 m = 90 m permanente + 10 m de parcheo", en: "100 m = 90 m permanent + 10 m patch" } },
      { label: { es: "Categorías", en: "Categories" }, value: "Cat5e 100 MHz, Cat6 250 MHz, Cat6A 500 MHz, Cat8 2000 MHz" },
      { label: { es: "Equivalente internacional", en: "International equivalent" }, value: "ISO/IEC 11801" },
    ],
    tools: [
      { command: "Cable certifier", description: { es: "Equipo de campo (p. ej., de la línea Fluke DSX) que mide un enlace contra los límites de una categoría y emite pasa/falla", en: "Field instrument (e.g. Fluke DSX line) that measures a link against a category's limits and reports pass/fail" } },
      { command: "Cable tester", description: { es: "Probador de continuidad que verifica el mapa de hilos: pares abiertos, en corto, cruzados o divididos", en: "Continuity tester that checks the wire map: open, shorted, crossed or split pairs" } },
      { command: "ethtool --cable-test eth0", description: { es: "Prueba TDR básica desde la propia tarjeta de red, si el PHY la soporta", en: "Basic TDR test from the network card itself, if the PHY supports it" } },
    ],
    relations: { usedBy: ["100base-tx", "1000base-t", "10gbase-t", "poe"] },
    specs: [
      { id: "ANSI/TIA-568.0-E", title: { es: "Cableado genérico de telecomunicaciones", en: "Generic Telecommunications Cabling for Customer Premises" } },
      { id: "ANSI/TIA-568.2-D", title: { es: "Cableado de par trenzado balanceado y componentes", en: "Balanced Twisted-Pair Telecommunications Cabling and Components" } },
      { id: "ISO/IEC 11801-1:2017", title: { es: "Cableado genérico: requisitos generales", en: "Generic cabling for customer premises: General requirements" } },
    ],
  },
  {
    id: "rs-232",
    acronym: "RS-232",
    fullName: { es: "Interfaz serial RS-232 (TIA-232)", en: "RS-232 serial interface (TIA-232)" },
    osi: [1],
    category: "serial",
    status: "legacy",
    bodies: ["ANSI/TIA", "ITU-T"],
    year: 1960,
    identifiers: ["DB-9 / DB-25", "±3 a ±15 V / ±3 to ±15 V", "9600 8N1"],
    summary: {
      es: "RS-232 es el puerto serial clásico de las computadoras antiguas, que envía los bits uno tras otro con voltajes positivos y negativos. Casi desapareció de los equipos de consumo, pero sigue siendo la puerta de entrada de emergencia a routers, switches y equipos industriales.",
      en: "RS-232 is the classic serial port of older computers, sending bits one after another as positive and negative voltages. It has nearly vanished from consumer devices, but it remains the emergency entry point to routers, switches and industrial equipment.",
    },
    analogy: {
      es: "Como hablar en código Morse por un solo cable: un bit a la vez, a un ritmo que ambos extremos acordaron de antemano.",
      en: "Like talking in Morse code over a single wire: one bit at a time, at a pace both ends agreed on beforehand.",
    },
    everyday: {
      es: "El cable de consola (a menudo celeste, RJ45 a DB-9) con el que un ingeniero configura un switch nuevo, o un adaptador USB-serial.",
      en: "The console cable (often light blue, RJ45 to DB-9) an engineer uses to set up a new switch, or a USB-to-serial adapter.",
    },
    technical: [
      {
        es: "La EIA publicó RS-232 en 1960 para conectar terminales (DTE) con módems (DCE); la revisión RS-232-C (1969) fue la más difundida y la vigente es TIA-232-F (1997). La ITU-T define lo equivalente en V.24 (funciones de los circuitos) y V.28 (características eléctricas). Es una señal no balanceada referida a tierra: un 1 lógico (mark) es un voltaje entre −3 y −15 V y un 0 (space) entre +3 y +15 V.",
        en: "The EIA published RS-232 in 1960 to connect terminals (DTE) to modems (DCE); revision RS-232-C (1969) became the most widespread and the current one is TIA-232-F (1997). The ITU-T defines the equivalent in V.24 (circuit functions) and V.28 (electrical characteristics). It is an unbalanced signal referenced to ground: a logic 1 (mark) is a voltage between −3 and −15 V and a 0 (space) between +3 and +15 V.",
      },
      {
        es: "Además de TxD, RxD y tierra, define líneas de control (RTS/CTS, DTR/DSR, DCD, RI) para el control de flujo por hardware y el estado del módem. El conector original era DB-25; en las PC se popularizó el DE-9 (llamado comúnmente DB-9). Para unir dos DTE sin módem se usa un cable null-modem que cruza TxD/RxD y las líneas de control.",
        en: "Besides TxD, RxD and ground, it defines control lines (RTS/CTS, DTR/DSR, DCD, RI) for hardware flow control and modem status. The original connector was DB-25; PCs popularised the DE-9 (commonly called DB-9). Connecting two DTEs without a modem takes a null-modem cable that crosses TxD/RxD and the control lines.",
      },
      {
        es: "La norma no define el formato de los datos; en la práctica se usa la trama asíncrona de una UART: un bit de inicio, 5 a 8 bits de datos (el menos significativo primero), paridad opcional y 1 o 2 bits de parada. «9600 8N1» (9600 baudios, 8 bits, sin paridad, 1 bit de parada) es la configuración típica de las consolas de red. Al no ser balanceada, la distancia y la velocidad son limitadas, del orden de 15 m a velocidades bajas.",
        en: "The standard does not define the data format; in practice the asynchronous UART frame is used: a start bit, 5 to 8 data bits (least significant first), optional parity and 1 or 2 stop bits. “9600 8N1” (9600 baud, 8 bits, no parity, 1 stop bit) is the typical setting for network consoles. Being unbalanced, distance and speed are limited, on the order of 15 m at low speeds.",
      },
    ],
    facts: [
      { label: { es: "Niveles", en: "Levels" }, value: { es: "1 = −3 a −15 V; 0 = +3 a +15 V", en: "1 = −3 to −15 V; 0 = +3 to +15 V" } },
      { label: { es: "Conectores", en: "Connectors" }, value: "DB-25, DE-9 (DB-9), RJ45 (consolas / consoles)" },
      { label: { es: "Tramado típico", en: "Typical framing" }, value: { es: "UART asíncrona 8N1", en: "Asynchronous UART 8N1" } },
      { label: { es: "Versión vigente", en: "Current revision" }, value: "TIA-232-F (1997)" },
      { label: { es: "Equivalente ITU-T", en: "ITU-T equivalent" }, value: "V.24 / V.28" },
    ],
    security: {
      es: "Un puerto de consola da acceso de administración directo, a menudo con opción de recuperar contraseñas; por eso el acceso físico a los racks debe controlarse y las consolas deben pedir autenticación.",
      en: "A console port grants direct administrative access, often with a password-recovery option; physical access to racks must therefore be controlled and consoles should require authentication.",
    },
    tools: [
      { command: "screen /dev/ttyUSB0 9600", description: { es: "Abre una consola serial a 9600 baudios en Linux o macOS", en: "Opens a serial console at 9600 baud on Linux or macOS" } },
      { command: "minicom -D /dev/ttyS0 -b 115200", description: { es: "Terminal serial con menú de configuración", en: "Serial terminal with a configuration menu" } },
      { command: "stty -F /dev/ttyS0 9600 cs8 -parenb -cstopb", description: { es: "Configura el puerto en 9600 8N1", en: "Sets the port to 9600 8N1" } },
    ],
    relations: { usedBy: ["ppp", "hdlc"], replacedBy: ["usb"] },
    specs: [
      { id: "TIA-232-F", title: { es: "Interfaz entre DTE y DCE con intercambio serial de datos binarios", en: "Interface Between Data Terminal Equipment and Data Circuit-Terminating Equipment Employing Serial Binary Data Interchange" } },
      { id: "ITU-T V.24", title: { es: "Definiciones de los circuitos de enlace DTE-DCE", en: "List of definitions for interchange circuits between DTE and DCE" }, url: itu("V.24") },
      { id: "ITU-T V.28", title: { es: "Características eléctricas de circuitos no balanceados", en: "Electrical characteristics for unbalanced double-current interchange circuits" }, url: itu("V.28") },
    ],
  },
  {
    id: "usb",
    acronym: "USB",
    fullName: { es: "Bus Serie Universal", en: "Universal Serial Bus" },
    osi: [1],
    category: "serial",
    status: "current",
    bodies: ["USB-IF"],
    year: 1996,
    identifiers: ["480 Mb/s (2.0)", "5 / 10 / 20 Gb/s (3.x)", "40 / 80 Gb/s (USB4)", "USB Type-C"],
    summary: {
      es: "USB es la interfaz estándar para conectar teclados, memorias, teléfonos, pantallas y cargadores. Ha pasado de 12 Mb/s a 80 Gb/s, y con el conector reversible USB-C sirve a la vez para datos, video y carga de hasta 240 W.",
      en: "USB is the standard interface for connecting keyboards, flash drives, phones, displays and chargers. It has grown from 12 Mb/s to 80 Gb/s, and with the reversible USB-C connector it now carries data, video and charging up to 240 W at once.",
    },
    analogy: {
      es: "Como un salón de clases donde solo el profesor (el host) da la palabra: los dispositivos no hablan hasta que se les pregunta.",
      en: "Like a classroom where only the teacher (the host) gives the floor: devices do not speak until they are asked.",
    },
    everyday: {
      es: "Cargar el celular, conectar una memoria o usar un adaptador USB-Ethernet o USB-serial.",
      en: "Charging your phone, plugging in a flash drive or using a USB-Ethernet or USB-serial adapter.",
    },
    technical: [
      {
        es: "USB 1.0 (1996) ofrecía Low Speed (1,5 Mb/s) y Full Speed (12 Mb/s), y USB 2.0 (2000) añadió High Speed a 480 Mb/s. Usan un par diferencial D+/D− half-duplex con codificación NRZI: un 0 cambia el nivel y un 1 lo mantiene, y tras seis unos seguidos se inserta un 0 (bit stuffing) para que el receptor no pierda la sincronía. El bus alimenta a los dispositivos con VBUS a 5 V.",
        en: "USB 1.0 (1996) offered Low Speed (1.5 Mb/s) and Full Speed (12 Mb/s), and USB 2.0 (2000) added High Speed at 480 Mb/s. They use a half-duplex D+/D− differential pair with NRZI encoding: a 0 toggles the level and a 1 keeps it, and after six consecutive ones a 0 is inserted (bit stuffing) so the receiver keeps its clock lock. The bus powers devices through VBUS at 5 V.",
      },
      {
        es: "USB 3.x añadió pares dedicados de transmisión y recepción (full-duplex): 5 Gb/s con codificación 8b/10b, 10 Gb/s con 128b/132b y 20 Gb/s combinando dos carriles sobre USB-C. USB4 (2019), basado en Thunderbolt 3, llega a 40 Gb/s y tuneliza USB, DisplayPort y PCIe sobre el mismo enlace; USB4 versión 2.0 (2022) alcanza 80 Gb/s con señalización PAM3. Los nombres comerciales cambiaron varias veces, así que conviene fijarse en la velocidad y no en el número de versión.",
        en: "USB 3.x added dedicated transmit and receive pairs (full-duplex): 5 Gb/s with 8b/10b encoding, 10 Gb/s with 128b/132b and 20 Gb/s by combining two lanes over USB-C. USB4 (2019), based on Thunderbolt 3, reaches 40 Gb/s and tunnels USB, DisplayPort and PCIe over the same link; USB4 version 2.0 (2022) hits 80 Gb/s with PAM3 signalling. Marketing names changed several times, so it is best to look at the speed rather than the version number.",
      },
      {
        es: "El conector USB Type-C (2014) es reversible; sus pines CC detectan la orientación y los roles, y permiten negociar USB Power Delivery, que llega a 100 W y, desde PD 3.1, a 240 W. Más allá de la capa física, USB es una pila completa centrada en el host: este sondea a los dispositivos y define transferencias de control, bulk, interrupción e isócronas, con hasta 127 dispositivos por controlador.",
        en: "The USB Type-C connector (2014) is reversible; its CC pins detect orientation and roles and allow negotiation of USB Power Delivery, which reaches 100 W and, since PD 3.1, 240 W. Beyond the physical layer, USB is a full host-centric stack: the host polls devices and defines control, bulk, interrupt and isochronous transfers, with up to 127 devices per controller.",
      },
    ],
    facts: [
      { label: { es: "USB 2.0", en: "USB 2.0" }, value: { es: "480 Mb/s, NRZI + bit stuffing, half-duplex", en: "480 Mb/s, NRZI + bit stuffing, half-duplex" } },
      { label: { es: "USB 3.x", en: "USB 3.x" }, value: { es: "5 / 10 / 20 Gb/s, full-duplex", en: "5 / 10 / 20 Gb/s, full-duplex" } },
      { label: { es: "USB4", en: "USB4" }, value: { es: "40 Gb/s (v2.0: 80 Gb/s)", en: "40 Gb/s (v2.0: 80 Gb/s)" } },
      { label: { es: "Energía", en: "Power" }, value: { es: "5 V VBUS; USB PD hasta 240 W", en: "5 V VBUS; USB PD up to 240 W" } },
      { label: { es: "Topología", en: "Topology" }, value: { es: "Estrella escalonada, hasta 127 dispositivos por controlador", en: "Tiered star, up to 127 devices per controller" } },
    ],
    security: {
      es: "Un dispositivo USB puede declararse como cualquier clase: una memoria modificada puede presentarse como teclado e inyectar comandos (BadUSB). Los puertos de carga públicos pueden intentar acceder a datos (juice jacking); los cables de solo carga o los bloqueadores de datos lo evitan.",
      en: "A USB device can declare itself as any class: a modified flash drive can pose as a keyboard and inject commands (BadUSB). Public charging ports may try to access data (juice jacking); charge-only cables or data blockers prevent it.",
    },
    tools: [
      { command: "lsusb -t", description: { es: "Árbol de dispositivos USB con la velocidad negociada de cada uno", en: "USB device tree with each one's negotiated speed" } },
      { command: "lsusb -v", description: { es: "Descriptores detallados: clases, interfaces y endpoints", en: "Detailed descriptors: classes, interfaces and endpoints" } },
    ],
    wireshark: "usb",
    relations: { usedBy: ["ethernet"], replaces: ["rs-232"] },
    specs: [
      { id: "USB 2.0", title: { es: "Especificación Universal Serial Bus, revisión 2.0", en: "Universal Serial Bus Specification, Revision 2.0" } },
      { id: "USB 3.2", title: { es: "Especificación Universal Serial Bus 3.2", en: "Universal Serial Bus 3.2 Specification" } },
      { id: "USB4 v2.0", title: { es: "Especificación USB4, versión 2.0", en: "USB4 Specification, Version 2.0" } },
      { id: "USB Type-C", title: { es: "Especificación del cable y conector USB Type-C", en: "USB Type-C Cable and Connector Specification" } },
    ],
  },
];
