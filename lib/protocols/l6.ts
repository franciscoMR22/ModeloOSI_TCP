import type { Protocol } from "@/lib/protocols/types";

const rfc = (n: number) => `https://www.rfc-editor.org/rfc/rfc${n}`;

export const L6_PROTOCOLS: Protocol[] = [
  {
    id: "tls",
    acronym: "TLS",
    fullName: { es: "Seguridad de la Capa de Transporte", en: "Transport Layer Security" },
    osi: [6, 5],
    category: "security",
    status: "current",
    bodies: ["IETF"],
    year: 1999,
    identifiers: ["TCP 443 (HTTPS)", "TCP 465 (SMTPS)", "TCP 993 (IMAPS)", "TCP 853 (DoT)"],
    summary: {
      es: "TLS cifra y autentica la comunicación entre dos programas: nadie en el camino puede leer ni modificar los datos, y el cliente puede comprobar que habla con el servidor correcto. Es la «S» de HTTPS y protege casi todo el tráfico de Internet.",
      en: "TLS encrypts and authenticates communication between two programs: nobody along the path can read or modify the data, and the client can verify it is talking to the right server. It is the \"S\" in HTTPS and protects almost all Internet traffic.",
    },
    analogy: {
      es: "Como una valija diplomática: antes de enviarla, ambas partes acuerdan un candado que solo ellas pueden abrir, y un notario (la autoridad certificadora) da fe de la identidad del destinatario.",
      en: "Like a diplomatic pouch: before sending it, both parties agree on a lock only they can open, and a notary (the certificate authority) vouches for the recipient's identity.",
    },
    everyday: {
      es: "El candado del navegador, las apps bancarias, el correo cifrado entre servidores y las llamadas a APIs.",
      en: "The browser padlock, banking apps, encrypted mail between servers and API calls.",
    },
    technical: [
      {
        es: "TLS nació como sucesor de SSL (Netscape, SSL 2.0 en 1995 y SSL 3.0 en 1996); TLS 1.0 se publicó como RFC 2246 en 1999. La versión vigente es TLS 1.3 (RFC 8446, 2018), junto con TLS 1.2 (RFC 5246, 2008). TLS 1.0 y 1.1 están formalmente obsoletos desde RFC 8996 (2021), SSL 3.0 desde RFC 7568 y SSL 2.0 está prohibido por RFC 6176.",
        en: "TLS succeeded SSL (Netscape, SSL 2.0 in 1995 and SSL 3.0 in 1996); TLS 1.0 was published as RFC 2246 in 1999. The current version is TLS 1.3 (RFC 8446, 2018), alongside TLS 1.2 (RFC 5246, 2008). TLS 1.0 and 1.1 are formally deprecated by RFC 8996 (2021), SSL 3.0 by RFC 7568, and SSL 2.0 is prohibited by RFC 6176.",
      },
      {
        es: "Se divide en dos partes. El protocolo de registro (record layer) fragmenta los datos en registros de hasta 2^14 bytes de texto plano, cada uno con una cabecera de 5 bytes (tipo, versión y longitud), y los protege con un cifrado AEAD (AES-GCM, ChaCha20-Poly1305). El protocolo de handshake negocia versión y suite de cifrado, intercambia claves efímeras (EC)DHE y autentica al servidor —y opcionalmente al cliente— con certificados X.509 (RFC 5280).",
        en: "It has two parts. The record protocol splits data into records of up to 2^14 bytes of plaintext, each with a 5-byte header (type, version and length), and protects them with an AEAD cipher (AES-GCM, ChaCha20-Poly1305). The handshake protocol negotiates version and cipher suite, exchanges ephemeral (EC)DHE keys and authenticates the server—and optionally the client—with X.509 certificates (RFC 5280).",
      },
      {
        es: "TLS 1.3 simplificó el protocolo: eliminó RSA estático, CBC, RC4, SHA-1 y la compresión, hizo obligatorio el secreto perfecto hacia adelante y redujo el handshake a 1 RTT (0-RTT al reanudar con una PSK). Extensiones clave son SNI (RFC 6066), que indica el nombre del servidor para elegir el certificado, y ALPN (RFC 7301), que negocia el protocolo de aplicación (h2, http/1.1) dentro del mismo handshake.",
        en: "TLS 1.3 simplified the protocol: it removed static RSA, CBC, RC4, SHA-1 and compression, made forward secrecy mandatory and cut the handshake to 1 RTT (0-RTT when resuming with a PSK). Key extensions are SNI (RFC 6066), which names the server so it can pick the right certificate, and ALPN (RFC 7301), which negotiates the application protocol (h2, http/1.1) within the same handshake.",
      },
    ],
    howItWorks: [
      { es: "ClientHello: el cliente envía versiones y suites soportadas, un key_share (ECDHE), SNI y ALPN.", en: "ClientHello: the client sends supported versions and suites, a key_share (ECDHE), SNI and ALPN." },
      { es: "ServerHello: el servidor elige suite y responde con su key_share; ambos derivan las claves con HKDF y todo lo siguiente va cifrado.", en: "ServerHello: the server picks a suite and replies with its key_share; both derive keys with HKDF and everything after is encrypted." },
      { es: "El servidor envía EncryptedExtensions, Certificate, CertificateVerify (firma del transcript) y Finished.", en: "The server sends EncryptedExtensions, Certificate, CertificateVerify (a signature over the transcript) and Finished." },
      { es: "El cliente valida la cadena de certificados y el nombre, envía su Finished y comienzan los datos de aplicación (1 RTT).", en: "The client validates the certificate chain and name, sends its Finished, and application data begins (1 RTT)." },
      { es: "Reanudación: el servidor puede enviar NewSessionTicket para reanudar después con PSK, incluso en 0-RTT.", en: "Resumption: the server may send a NewSessionTicket so the client can later resume with a PSK, even in 0-RTT." },
    ],
    facts: [
      { label: { es: "Versión vigente", en: "Current version" }, value: "TLS 1.3 (RFC 8446)" },
      { label: { es: "Handshake", en: "Handshake" }, value: { es: "1 RTT (0-RTT al reanudar)", en: "1 RTT (0-RTT on resumption)" } },
      { label: { es: "Cabecera de registro", en: "Record header" }, value: { es: "5 B; hasta 2^14 B de texto plano por registro", en: "5 B; up to 2^14 B of plaintext per record" } },
      { label: { es: "Cifrados (1.3)", en: "Ciphers (1.3)" }, value: { es: "Solo AEAD: AES-GCM, ChaCha20-Poly1305, AES-CCM", en: "AEAD only: AES-GCM, ChaCha20-Poly1305, AES-CCM" } },
      { label: { es: "Secreto hacia adelante", en: "Forward secrecy" }, value: { es: "Obligatorio en TLS 1.3", en: "Mandatory in TLS 1.3" } },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "Flujo confiable (TCP); DTLS para UDP", en: "Reliable stream (TCP); DTLS for UDP" } },
    ],
    security: {
      es: "Los ataques históricos (BEAST, POODLE, CRIME, Lucky 13, FREAK, Logjam) explotaron versiones y cifrados antiguos, y Heartbleed (2014) fue un fallo de implementación en OpenSSL, no del protocolo. RFC 9325 (BCP 195) recomienda TLS 1.2 como mínimo y 1.3 cuando sea posible. Los datos 0-RTT pueden reenviarse (replay), y el SNI viaja en claro salvo que se use Encrypted Client Hello (ECH). La seguridad depende de validar bien la cadena de certificados y el nombre del host.",
      en: "Historic attacks (BEAST, POODLE, CRIME, Lucky 13, FREAK, Logjam) exploited old versions and ciphers, and Heartbleed (2014) was an OpenSSL implementation bug, not a protocol flaw. RFC 9325 (BCP 195) recommends TLS 1.2 as a minimum and 1.3 where possible. 0-RTT data can be replayed, and SNI travels in cleartext unless Encrypted Client Hello (ECH) is used. Security hinges on properly validating the certificate chain and host name.",
    },
    multiLayerNote: {
      es: "Los libros suelen ubicar TLS en L6 porque cifra y da formato a los datos antes de entregarlos, pero también gestiona sesiones y su reanudación (función de L5) y, en la práctica, es una biblioteca que la aplicación usa entre TCP y su propio protocolo. En el modelo TCP/IP no tiene capa propia: forma parte de la aplicación. Su nombre, «de transporte», añade a la confusión.",
      en: "Textbooks usually place TLS at L6 because it encrypts and shapes data before handing it over, but it also manages sessions and their resumption (an L5 function) and, in practice, is a library the application uses between TCP and its own protocol. In the TCP/IP model it has no layer of its own: it is part of the application. Its \"transport\" name adds to the confusion.",
    },
    tools: [
      { command: "openssl s_client -connect example.com:443 -servername example.com", description: { es: "Abre una sesión TLS y muestra versión, suite y certificados", en: "Opens a TLS session and shows version, suite and certificates" } },
      { command: "curl -vI https://example.com", description: { es: "Muestra el handshake, ALPN y el certificado del servidor", en: "Shows the handshake, ALPN and the server certificate" } },
      { command: "nmap --script ssl-enum-ciphers -p 443 example.com", description: { es: "Enumera versiones y suites aceptadas por el servidor", en: "Enumerates versions and suites the server accepts" } },
    ],
    wireshark: "tls.handshake.type == 1",
    relations: {
      dependsOn: ["tcp", "asn1"],
      usedBy: ["http1", "http2", "quic", "smtp", "imap", "pop3", "dot", "doh", "ldap", "mqtt"],
    },
    specs: [
      { id: "RFC 8446", title: { es: "Protocolo TLS versión 1.3", en: "The Transport Layer Security (TLS) Protocol Version 1.3" }, url: rfc(8446) },
      { id: "RFC 5246", title: { es: "Protocolo TLS versión 1.2", en: "The Transport Layer Security (TLS) Protocol Version 1.2" }, url: rfc(5246) },
      { id: "RFC 8996", title: { es: "Obsolescencia de TLS 1.0 y TLS 1.1", en: "Deprecating TLS 1.0 and TLS 1.1" }, url: rfc(8996) },
      { id: "RFC 9325", title: { es: "Recomendaciones para el uso seguro de TLS y DTLS", en: "Recommendations for Secure Use of TLS and DTLS" }, url: rfc(9325) },
      { id: "RFC 5280", title: { es: "Perfil de certificados X.509 y CRL para Internet", en: "Internet X.509 PKI Certificate and CRL Profile" }, url: rfc(5280) },
      { id: "RFC 7301", title: { es: "Extensión ALPN de TLS", en: "TLS Application-Layer Protocol Negotiation Extension" }, url: rfc(7301) },
    ],
  },
  {
    id: "dtls",
    acronym: "DTLS",
    fullName: { es: "Seguridad de la Capa de Transporte para Datagramas", en: "Datagram Transport Layer Security" },
    osi: [6],
    category: "security",
    status: "current",
    bodies: ["IETF"],
    year: 2006,
    identifiers: ["UDP 5684 (CoAPS)"],
    summary: {
      es: "DTLS es TLS adaptado a UDP: ofrece el mismo cifrado y autenticación, pero tolera que los paquetes se pierdan o lleguen desordenados. Se usa donde la baja latencia importa más que la entrega garantizada.",
      en: "DTLS is TLS adapted to UDP: it provides the same encryption and authentication but tolerates packets being lost or reordered. It is used where low latency matters more than guaranteed delivery.",
    },
    everyday: {
      es: "Las videollamadas en el navegador (WebRTC negocia las claves de SRTP con DTLS), dispositivos IoT con CoAP y muchas VPN SSL que envían los datos por UDP.",
      en: "Browser video calls (WebRTC negotiates SRTP keys with DTLS), IoT devices using CoAP, and many SSL VPNs that carry data over UDP.",
    },
    technical: [
      {
        es: "TLS supone un transporte confiable: si se pierde un registro, falla el descifrado de los siguientes. DTLS añade a cada registro un número de época (epoch) y un número de secuencia explícito, de modo que cada datagrama se descifra de forma independiente; en DTLS 1.2 la cabecera de registro crece a 13 bytes. Una ventana deslizante descarta duplicados (anti-replay).",
        en: "TLS assumes a reliable transport: if a record is lost, decryption of the following ones fails. DTLS adds an epoch and an explicit sequence number to each record so every datagram can be decrypted independently; in DTLS 1.2 the record header grows to 13 bytes. A sliding window discards duplicates (anti-replay).",
      },
      {
        es: "El handshake se protege con sus propios mecanismos: temporizadores de retransmisión, números de secuencia de mensaje y fragmentación para que los mensajes grandes (certificados) quepan en la MTU. Para evitar la amplificación, el servidor puede exigir una cookie antes de guardar estado (HelloVerifyRequest en 1.2, HelloRetryRequest en 1.3).",
        en: "The handshake has its own mechanisms: retransmission timers, message sequence numbers, and fragmentation so large messages (certificates) fit within the MTU. To prevent amplification, the server may demand a cookie before keeping state (HelloVerifyRequest in 1.2, HelloRetryRequest in 1.3).",
      },
      {
        es: "DTLS 1.0 (RFC 4347, 2006) se basaba en TLS 1.1 y está obsoleto desde RFC 8996. DTLS 1.2 (RFC 6347, 2012) sigue muy extendido y DTLS 1.3 (RFC 9147, 2022) se alinea con TLS 1.3, añade una cabecera compacta y mensajes ACK. RFC 9146 define Connection IDs para que la sesión sobreviva a cambios de dirección o de puerto por NAT.",
        en: "DTLS 1.0 (RFC 4347, 2006) was based on TLS 1.1 and is deprecated by RFC 8996. DTLS 1.2 (RFC 6347, 2012) remains widespread and DTLS 1.3 (RFC 9147, 2022) aligns with TLS 1.3, adding a compact header and ACK messages. RFC 9146 defines Connection IDs so the session survives address or port changes caused by NAT.",
      },
    ],
    facts: [
      { label: { es: "Versiones vigentes", en: "Current versions" }, value: "DTLS 1.2 (RFC 6347), DTLS 1.3 (RFC 9147)" },
      { label: { es: "Transporte", en: "Transport" }, value: { es: "UDP (también SCTP)", en: "UDP (also SCTP)" } },
      { label: { es: "Cabecera de registro (1.2)", en: "Record header (1.2)" }, value: { es: "13 B (añade epoch y secuencia de 48 bits)", en: "13 B (adds epoch and 48-bit sequence)" } },
      { label: { es: "Anti-DoS", en: "Anti-DoS" }, value: { es: "Cookie sin estado en el handshake", en: "Stateless cookie in the handshake" } },
      { label: { es: "Orden y entrega", en: "Ordering and delivery" }, value: { es: "No garantizados para los datos de aplicación", en: "Not guaranteed for application data" } },
    ],
    security: {
      es: "Sin la cookie, un servidor DTLS puede usarse para amplificar tráfico hacia una IP falsificada. Deben aplicarse las mismas reglas que en TLS: nada de DTLS 1.0, suites AEAD y validación de certificados. En WebRTC la identidad se liga comparando la huella del certificado anunciada en la señalización (SDP).",
      en: "Without the cookie, a DTLS server can be abused to amplify traffic toward a spoofed IP. The same rules as TLS apply: no DTLS 1.0, AEAD suites and certificate validation. In WebRTC, identity is bound by comparing the certificate fingerprint announced in signalling (SDP).",
    },
    tools: [
      { command: "openssl s_client -dtls1_2 -connect host:5684", description: { es: "Abre una sesión DTLS 1.2 contra un servidor UDP", en: "Opens a DTLS 1.2 session to a UDP server" } },
      { command: "openssl s_server -dtls1_2 -accept 4433", description: { es: "Levanta un servidor DTLS de prueba", en: "Starts a test DTLS server" } },
    ],
    wireshark: "dtls",
    relations: { dependsOn: ["udp"], usedBy: ["coap", "sctp", "rtcp"], replaces: [] },
    specs: [
      { id: "RFC 9147", title: { es: "Protocolo DTLS versión 1.3", en: "The Datagram Transport Layer Security (DTLS) Protocol Version 1.3" }, url: rfc(9147) },
      { id: "RFC 6347", title: { es: "Datagram Transport Layer Security versión 1.2", en: "Datagram Transport Layer Security Version 1.2" }, url: rfc(6347) },
      { id: "RFC 9146", title: { es: "Connection ID para DTLS 1.2", en: "Connection Identifier for DTLS 1.2" }, url: rfc(9146) },
      { id: "RFC 5764", title: { es: "Extensión DTLS para establecer claves de SRTP", en: "DTLS Extension to Establish Keys for SRTP" }, url: rfc(5764) },
    ],
  },
  {
    id: "asn1",
    acronym: "ASN.1",
    fullName: { es: "Notación de Sintaxis Abstracta Uno", en: "Abstract Syntax Notation One" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["ITU-T", "ISO/IEC"],
    year: 1984,
    summary: {
      es: "ASN.1 es un lenguaje para describir estructuras de datos de forma independiente de la máquina, junto con reglas para convertirlas en bytes. Es el ejemplo clásico de la capa de presentación del modelo OSI.",
      en: "ASN.1 is a language for describing data structures in a machine-independent way, together with rules for turning them into bytes. It is the textbook example of the OSI presentation layer.",
    },
    analogy: {
      es: "Como el plano de un formulario oficial (ASN.1) y las reglas para llenarlo a mano o a máquina (BER, DER, PER): el contenido es el mismo aunque cambie la forma de escribirlo.",
      en: "Like the blueprint of an official form (ASN.1) and the rules for filling it in by hand or by typewriter (BER, DER, PER): the content is the same even when the way of writing it changes.",
    },
    everyday: {
      es: "Cada certificado HTTPS es una estructura ASN.1 codificada en DER; también la usan SNMP, LDAP, Kerberos y la señalización de redes móviles 4G/5G.",
      en: "Every HTTPS certificate is an ASN.1 structure encoded in DER; it is also used by SNMP, LDAP, Kerberos and 4G/5G mobile network signalling.",
    },
    technical: [
      {
        es: "ASN.1 separa la sintaxis abstracta (qué tipos y campos existen) de la sintaxis de transferencia (cómo se serializan). La notación está en ITU-T X.680 (= ISO/IEC 8824-1) y define tipos como INTEGER, BOOLEAN, OCTET STRING, OBJECT IDENTIFIER, SEQUENCE, SET y CHOICE. Su antecedente es la recomendación X.409 del CCITT de 1984, pensada para el correo X.400.",
        en: "ASN.1 separates abstract syntax (which types and fields exist) from transfer syntax (how they are serialised). The notation is ITU-T X.680 (= ISO/IEC 8824-1) and defines types such as INTEGER, BOOLEAN, OCTET STRING, OBJECT IDENTIFIER, SEQUENCE, SET and CHOICE. Its predecessor was CCITT Recommendation X.409 of 1984, designed for X.400 mail.",
      },
      {
        es: "Las reglas de codificación básicas están en ITU-T X.690 (= ISO/IEC 8825-1): BER usa tripletas TLV (etiqueta, longitud, valor) y admite varias codificaciones del mismo valor; CER y DER son subconjuntos canónicos. DER garantiza una única codificación, requisito imprescindible para firmar digitalmente estructuras como los certificados X.509.",
        en: "The basic encoding rules are in ITU-T X.690 (= ISO/IEC 8825-1): BER uses TLV triplets (tag, length, value) and allows several encodings of the same value; CER and DER are canonical subsets. DER guarantees a single encoding, a hard requirement for digitally signing structures such as X.509 certificates.",
      },
      {
        es: "Otras reglas buscan compacidad o legibilidad: PER (X.691) elimina etiquetas y longitudes deducibles del esquema y se usa en protocolos de radio como S1AP y NGAP; XER (X.693) codifica en XML. Los compiladores ASN.1 generan código para C, Java u otros lenguajes a partir del módulo de definición.",
        en: "Other rules aim for compactness or readability: PER (X.691) drops tags and lengths that can be inferred from the schema and is used in radio-network protocols such as S1AP and NGAP; XER (X.693) encodes as XML. ASN.1 compilers generate C, Java or other code from the definition module.",
      },
    ],
    facts: [
      { label: { es: "Notación", en: "Notation" }, value: "ITU-T X.680 / ISO/IEC 8824-1" },
      { label: { es: "Codificaciones", en: "Encodings" }, value: "BER, CER, DER (X.690); PER (X.691); XER (X.693)" },
      { label: { es: "Estructura BER/DER", en: "BER/DER structure" }, value: { es: "TLV: etiqueta, longitud, valor", en: "TLV: tag, length, value" } },
      { label: { es: "Autodescriptivo", en: "Self-describing" }, value: { es: "BER/DER sí (etiquetas); PER no", en: "BER/DER yes (tags); PER no" } },
    ],
    security: {
      es: "Los analizadores de ASN.1 son una fuente histórica de vulnerabilidades: longitudes indefinidas o anidamiento profundo pueden provocar desbordamientos de búfer y denegación de servicio, y aceptar BER donde se espera DER ha permitido falsificar firmas. Conviene usar bibliotecas maduras y validar estrictamente.",
      en: "ASN.1 parsers are a historic source of vulnerabilities: indefinite lengths or deep nesting can cause buffer overflows and denial of service, and accepting BER where DER is expected has enabled signature forgery. Mature libraries and strict validation are advisable.",
    },
    tools: [
      { command: "openssl asn1parse -in cert.pem", description: { es: "Muestra la estructura DER de un certificado", en: "Shows the DER structure of a certificate" } },
      { command: "dumpasn1 cert.der", description: { es: "Vuelca cualquier objeto BER/DER de forma legible", en: "Dumps any BER/DER object in readable form" } },
    ],
    wireshark: "ber",
    relations: { usedBy: ["tls", "snmp", "ldap", "kerberos"] },
    specs: [
      { id: "ITU-T X.680", title: { es: "ASN.1: especificación de la notación básica", en: "ASN.1: Specification of basic notation" }, url: "https://www.itu.int/rec/T-REC-X.680" },
      { id: "ITU-T X.690", title: { es: "Reglas de codificación BER, CER y DER", en: "ASN.1 encoding rules: BER, CER and DER" }, url: "https://www.itu.int/rec/T-REC-X.690" },
      { id: "ITU-T X.691", title: { es: "Reglas de codificación empaquetadas (PER)", en: "ASN.1 encoding rules: Packed Encoding Rules (PER)" }, url: "https://www.itu.int/rec/T-REC-X.691" },
    ],
  },
  {
    id: "xdr",
    acronym: "XDR",
    fullName: { es: "Representación Externa de Datos", en: "External Data Representation" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["IETF"],
    year: 1987,
    summary: {
      es: "XDR es un formato estándar para representar enteros, textos y estructuras en bytes, de modo que máquinas con arquitecturas distintas se entiendan. Lo creó Sun para sus llamadas remotas y su sistema de archivos en red NFS.",
      en: "XDR is a standard format for representing integers, strings and structures as bytes so that machines with different architectures understand each other. Sun created it for its remote calls and the NFS network file system.",
    },
    everyday: {
      es: "Cada vez que un equipo Linux o Unix monta una carpeta por NFS, los argumentos de cada operación viajan en XDR.",
      en: "Whenever a Linux or Unix machine mounts a folder over NFS, the arguments of every operation travel in XDR.",
    },
    technical: [
      {
        es: "XDR resuelve las diferencias de orden de bytes y alineación con una representación canónica: todo va en big-endian y en unidades de 4 bytes, rellenando con ceros lo que no ocupe un múltiplo de 4. Define int y unsigned int (32 bits), hyper (64 bits), float y double IEEE 754, opaque, string, arreglos fijos y variables, structs y uniones discriminadas.",
        en: "XDR resolves byte-order and alignment differences with a canonical representation: everything is big-endian and in 4-byte units, zero-padding anything that is not a multiple of 4. It defines int and unsigned int (32 bits), hyper (64 bits), IEEE 754 float and double, opaque, string, fixed and variable arrays, structs and discriminated unions.",
      },
      {
        es: "A diferencia de BER, XDR no es autodescriptivo: no hay etiquetas de tipo en el flujo, así que ambos extremos deben conocer de antemano la definición, escrita en un lenguaje similar a C (archivos .x) que la herramienta rpcgen convierte en código. Esto lo hace compacto y rápido, pero poco tolerante a cambios de esquema.",
        en: "Unlike BER, XDR is not self-describing: there are no type tags in the stream, so both ends must know the definition in advance, written in a C-like language (.x files) that the rpcgen tool turns into code. This makes it compact and fast but not very tolerant of schema changes.",
      },
      {
        es: "Se publicó como RFC 1014 en 1987, se revisó en RFC 1832 (1995) y la versión vigente es RFC 4506 (2006, STD 67). Sigue en uso como formato de ONC RPC y de todas las versiones de NFS.",
        en: "It was published as RFC 1014 in 1987, revised in RFC 1832 (1995), and the current version is RFC 4506 (2006, STD 67). It remains in use as the format of ONC RPC and every NFS version.",
      },
    ],
    facts: [
      { label: { es: "Orden de bytes", en: "Byte order" }, value: "Big-endian" },
      { label: { es: "Alineación", en: "Alignment" }, value: { es: "Múltiplos de 4 B con relleno", en: "4 B multiples with padding" } },
      { label: { es: "Autodescriptivo", en: "Self-describing" }, value: { es: "No (tipado implícito)", en: "No (implicit typing)" } },
      { label: { es: "Lenguaje de definición", en: "Definition language" }, value: { es: "Archivos .x compilados con rpcgen", en: ".x files compiled with rpcgen" } },
    ],
    tools: [
      { command: "rpcgen -a service.x", description: { es: "Genera stubs y rutinas XDR a partir de una definición", en: "Generates stubs and XDR routines from a definition" } },
    ],
    wireshark: "rpc",
    relations: { usedBy: ["onc-rpc", "nfs"] },
    specs: [
      { id: "RFC 4506", title: { es: "XDR: estándar de representación externa de datos", en: "XDR: External Data Representation Standard" }, url: rfc(4506) },
    ],
  },
  {
    id: "mime",
    acronym: "MIME",
    fullName: { es: "Extensiones Multipropósito de Correo de Internet", en: "Multipurpose Internet Mail Extensions" },
    osi: [6],
    category: "text",
    status: "current",
    bodies: ["IETF"],
    year: 1992,
    summary: {
      es: "MIME permite que un mensaje de correo lleve algo más que texto en inglés: acentos, varias partes, imágenes y archivos adjuntos. Sus «tipos de medio» (como text/html o image/png) también indican en la web qué tipo de contenido se está enviando.",
      en: "MIME lets an email carry more than plain English text: accents, multiple parts, images and attachments. Its \"media types\" (such as text/html or image/png) also tell the web what kind of content is being sent.",
    },
    analogy: {
      es: "Como las etiquetas de un paquete que dicen «frágil: vidrio» o «contiene tres cajas»: indican qué hay dentro y cómo desempacarlo.",
      en: "Like the labels on a parcel saying \"fragile: glass\" or \"contains three boxes\": they tell you what is inside and how to unpack it.",
    },
    everyday: {
      es: "Cada correo con adjunto o con versión HTML y texto plano, y la cabecera Content-Type de cada respuesta HTTP.",
      en: "Every email with an attachment or with HTML and plain-text versions, and the Content-Type header of every HTTP response.",
    },
    technical: [
      {
        es: "El correo original (RFC 822) solo admitía texto ASCII de 7 bits. MIME añade cabeceras: MIME-Version, Content-Type (tipo/subtipo y parámetros como charset), Content-Transfer-Encoding (7bit, 8bit, binary, quoted-printable o base64) y Content-Disposition para adjuntos. RFC 2047 permite además caracteres no ASCII en cabeceras como el asunto.",
        en: "Original email (RFC 822) only allowed 7-bit ASCII text. MIME adds headers: MIME-Version, Content-Type (type/subtype plus parameters such as charset), Content-Transfer-Encoding (7bit, 8bit, binary, quoted-printable or base64) and Content-Disposition for attachments. RFC 2047 also allows non-ASCII characters in headers such as the subject.",
      },
      {
        es: "Los tipos multipart encadenan varias partes separadas por una cadena boundary: multipart/mixed para adjuntos, multipart/alternative para ofrecer texto y HTML, y multipart/related para imágenes incrustadas. En HTTP, multipart/form-data transporta los archivos subidos desde formularios.",
        en: "Multipart types chain several parts separated by a boundary string: multipart/mixed for attachments, multipart/alternative to offer text and HTML, and multipart/related for embedded images. In HTTP, multipart/form-data carries files uploaded from forms.",
      },
      {
        es: "La primera versión fue RFC 1341 (1992); la vigente es la serie RFC 2045–2049 (1996). Los tipos de medio se registran en IANA según RFC 6838 y HTTP los reutiliza en Content-Type y Accept (RFC 9110). S/MIME añade firma y cifrado de extremo a extremo sobre la misma estructura.",
        en: "The first version was RFC 1341 (1992); the current one is the RFC 2045–2049 series (1996). Media types are registered with IANA under RFC 6838, and HTTP reuses them in Content-Type and Accept (RFC 9110). S/MIME adds end-to-end signing and encryption on top of the same structure.",
      },
    ],
    facts: [
      { label: { es: "Cabeceras clave", en: "Key headers" }, value: "MIME-Version, Content-Type, Content-Transfer-Encoding" },
      { label: { es: "Codificaciones de transferencia", en: "Transfer encodings" }, value: "7bit, 8bit, binary, quoted-printable, base64" },
      { label: { es: "Ejemplos de tipos", en: "Example types" }, value: "text/html, application/json, image/png, multipart/mixed" },
      { label: { es: "Registro", en: "Registry" }, value: { es: "IANA Media Types (RFC 6838)", en: "IANA Media Types (RFC 6838)" } },
    ],
    security: {
      es: "El tipo declarado no garantiza el contenido real: los adjuntos maliciosos suelen disfrazarse con dobles extensiones o tipos engañosos. En la web, los navegadores que «adivinan» el tipo (MIME sniffing) pueden ejecutar como script lo que se subió como imagen; la cabecera X-Content-Type-Options: nosniff lo impide.",
      en: "The declared type does not guarantee the real content: malicious attachments often hide behind double extensions or misleading types. On the web, browsers that \"guess\" the type (MIME sniffing) may execute as script something uploaded as an image; the X-Content-Type-Options: nosniff header prevents it.",
    },
    tools: [
      { command: "file --mime-type documento.pdf", description: { es: "Detecta el tipo MIME real de un archivo por su contenido", en: "Detects a file's real MIME type from its content" } },
      { command: "curl -sI https://example.com", description: { es: "Muestra el Content-Type que devuelve un servidor", en: "Shows the Content-Type a server returns" } },
    ],
    wireshark: "mime_multipart",
    relations: { dependsOn: ["base64", "utf8"], usedBy: ["smtp", "imap", "pop3", "http1", "http2"] },
    specs: [
      { id: "RFC 2045", title: { es: "MIME parte 1: formato del cuerpo de los mensajes", en: "MIME Part One: Format of Internet Message Bodies" }, url: rfc(2045) },
      { id: "RFC 2046", title: { es: "MIME parte 2: tipos de medio", en: "MIME Part Two: Media Types" }, url: rfc(2046) },
      { id: "RFC 2047", title: { es: "MIME parte 3: texto no ASCII en cabeceras", en: "MIME Part Three: Message Header Extensions for Non-ASCII Text" }, url: rfc(2047) },
      { id: "RFC 6838", title: { es: "Especificación y registro de tipos de medio", en: "Media Type Specifications and Registration Procedures" }, url: rfc(6838) },
    ],
  },
  {
    id: "json",
    acronym: "JSON",
    fullName: { es: "Notación de Objetos de JavaScript", en: "JavaScript Object Notation" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["IETF", "ECMA"],
    year: 2006,
    summary: {
      es: "JSON es un formato de texto sencillo para intercambiar datos estructurados: objetos con claves y valores, listas, textos y números. Es legible por personas y lo entiende prácticamente cualquier lenguaje de programación.",
      en: "JSON is a simple text format for exchanging structured data: objects with keys and values, lists, strings and numbers. It is human-readable and understood by virtually every programming language.",
    },
    everyday: {
      es: "Casi todas las APIs web y apps móviles envían y reciben JSON; también muchos archivos de configuración.",
      en: "Nearly every web API and mobile app sends and receives JSON; so do many configuration files.",
    },
    technical: [
      {
        es: "JSON define seis tipos de valor: objeto (pares clave-valor entre llaves), arreglo, cadena (entre comillas dobles, con escapes \\uXXXX), número, los literales true/false y null. Deriva de la sintaxis de literales de JavaScript, pero es independiente del lenguaje. No admite comentarios, fechas ni datos binarios nativos (estos suelen enviarse en Base64).",
        en: "JSON defines six value types: object (key-value pairs in braces), array, string (double-quoted, with \\uXXXX escapes), number, the literals true/false, and null. It derives from JavaScript literal syntax but is language-independent. It has no comments, dates or native binary data (the latter usually travels as Base64).",
      },
      {
        es: "La especificación vigente es RFC 8259 (2017, STD 90), alineada con ECMA-404; sustituyó a RFC 7159 (2014) y a RFC 4627 (2006). Exige UTF-8 para el intercambio entre sistemas abiertos. Deja sin definir aspectos como las claves duplicadas o la precisión de los números; en la práctica, los enteros más allá de 2^53 pierden precisión en implementaciones que usan double IEEE 754, y el perfil I-JSON (RFC 7493) restringe esos casos.",
        en: "The current specification is RFC 8259 (2017, STD 90), aligned with ECMA-404; it replaced RFC 7159 (2014) and RFC 4627 (2006). It mandates UTF-8 for interchange between open systems. It leaves some aspects undefined, such as duplicate keys or numeric precision; in practice, integers beyond 2^53 lose precision in implementations using IEEE 754 doubles, and the I-JSON profile (RFC 7493) restricts those cases.",
      },
    ],
    facts: [
      { label: { es: "Tipo de medio", en: "Media type" }, value: "application/json" },
      { label: { es: "Codificación", en: "Encoding" }, value: { es: "UTF-8 obligatorio en intercambio abierto", en: "UTF-8 mandatory for open interchange" } },
      { label: { es: "Tipos", en: "Types" }, value: { es: "Objeto, arreglo, cadena, número, true/false, null", en: "Object, array, string, number, true/false, null" } },
      { label: { es: "Esquema", en: "Schema" }, value: { es: "Opcional (JSON Schema, no es RFC)", en: "Optional (JSON Schema, not an RFC)" } },
    ],
    security: {
      es: "Nunca debe evaluarse JSON como código (eval). Las claves duplicadas pueden interpretarse distinto por dos analizadores, lo que permite evadir validaciones; en JavaScript, claves como __proto__ pueden provocar contaminación de prototipos. Conviene limitar tamaño y profundidad para evitar denegación de servicio.",
      en: "JSON must never be evaluated as code (eval). Duplicate keys may be interpreted differently by two parsers, enabling validation bypasses; in JavaScript, keys such as __proto__ can cause prototype pollution. Limiting size and depth helps prevent denial of service.",
    },
    tools: [
      { command: "jq . data.json", description: { es: "Valida y formatea un documento JSON", en: "Validates and pretty-prints a JSON document" } },
      { command: "python3 -m json.tool data.json", description: { es: "Valida JSON con la biblioteca estándar de Python", en: "Validates JSON with Python's standard library" } },
    ],
    wireshark: "json",
    relations: { dependsOn: ["utf8"], usedBy: ["http1", "http2", "http3", "websocket", "mqtt"] },
    specs: [
      { id: "RFC 8259", title: { es: "Formato de intercambio de datos JSON", en: "The JavaScript Object Notation (JSON) Data Interchange Format" }, url: rfc(8259) },
      { id: "ECMA-404", title: { es: "Sintaxis de intercambio de datos JSON", en: "The JSON Data Interchange Syntax" } },
      { id: "RFC 7493", title: { es: "Formato I-JSON", en: "The I-JSON Message Format" }, url: rfc(7493) },
    ],
  },
  {
    id: "xml",
    acronym: "XML",
    fullName: { es: "Lenguaje de Marcado Extensible", en: "Extensible Markup Language" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["W3C"],
    year: 1998,
    summary: {
      es: "XML es un formato de texto con etiquetas para representar documentos y datos estructurados. Es más verboso que JSON, pero admite esquemas estrictos, espacios de nombres y validación formal.",
      en: "XML is a tag-based text format for representing documents and structured data. It is more verbose than JSON but supports strict schemas, namespaces and formal validation.",
    },
    everyday: {
      es: "Los archivos de Office (.docx, .xlsx), las imágenes SVG, los feeds RSS, las facturas electrónicas y el inicio de sesión único con SAML.",
      en: "Office files (.docx, .xlsx), SVG images, RSS feeds, electronic invoices and SAML single sign-on.",
    },
    technical: [
      {
        es: "XML 1.0 es una Recomendación del W3C de 1998, derivada de SGML; la edición vigente es la quinta (2008). Un documento está bien formado si cumple la sintaxis (una raíz, etiquetas anidadas y cerradas, atributos entre comillas) y es válido si además cumple un esquema: DTD, XML Schema (XSD) o RELAX NG. La codificación por defecto es UTF-8.",
        en: "XML 1.0 is a 1998 W3C Recommendation derived from SGML; the current edition is the fifth (2008). A document is well-formed if it follows the syntax (one root, properly nested and closed tags, quoted attributes) and valid if it also satisfies a schema: DTD, XML Schema (XSD) or RELAX NG. The default encoding is UTF-8.",
      },
      {
        es: "Los espacios de nombres (Namespaces in XML) evitan colisiones asociando elementos a URIs, lo que permite mezclar vocabularios en un mismo documento. A su alrededor creció un ecosistema: XPath y XSLT para consultar y transformar, XML Signature y XML Encryption, y protocolos como SOAP y XMPP.",
        en: "Namespaces (Namespaces in XML) avoid collisions by binding elements to URIs, allowing vocabularies to be mixed in one document. An ecosystem grew around it: XPath and XSLT to query and transform, XML Signature and XML Encryption, and protocols such as SOAP and XMPP.",
      },
    ],
    facts: [
      { label: { es: "Versión vigente", en: "Current version" }, value: { es: "XML 1.0, quinta edición (2008)", en: "XML 1.0, Fifth Edition (2008)" } },
      { label: { es: "Esquemas", en: "Schemas" }, value: "DTD, XSD, RELAX NG" },
      { label: { es: "Tipos de medio", en: "Media types" }, value: "application/xml, text/xml" },
      { label: { es: "Codificación por defecto", en: "Default encoding" }, value: "UTF-8" },
    ],
    security: {
      es: "XXE (XML External Entity): si el analizador resuelve entidades externas, un atacante puede leer archivos locales o forzar peticiones internas (SSRF). La expansión recursiva de entidades («billion laughs») agota la memoria. La mitigación es desactivar DTD y entidades externas. XML Signature también ha sufrido ataques de envoltura de firmas (signature wrapping) en SAML.",
      en: "XXE (XML External Entity): if the parser resolves external entities, an attacker can read local files or force internal requests (SSRF). Recursive entity expansion (\"billion laughs\") exhausts memory. The mitigation is to disable DTDs and external entities. XML Signature has also suffered signature-wrapping attacks in SAML.",
    },
    tools: [
      { command: "xmllint --noout --schema schema.xsd doc.xml", description: { es: "Valida un documento contra un esquema XSD", en: "Validates a document against an XSD schema" } },
      { command: "xmllint --format doc.xml", description: { es: "Comprueba que está bien formado y lo indenta", en: "Checks well-formedness and indents it" } },
    ],
    wireshark: "xml",
    relations: { dependsOn: ["utf8"], usedBy: ["xmpp", "http1", "sip"] },
    specs: [
      { id: "W3C XML 1.0", title: { es: "Extensible Markup Language (XML) 1.0, quinta edición", en: "Extensible Markup Language (XML) 1.0 (Fifth Edition)" }, url: "https://www.w3.org/TR/xml/" },
      { id: "W3C XML Namespaces", title: { es: "Espacios de nombres en XML 1.0", en: "Namespaces in XML 1.0" }, url: "https://www.w3.org/TR/xml-names/" },
    ],
  },
  {
    id: "protobuf",
    acronym: "Protobuf",
    fullName: { es: "Protocol Buffers", en: "Protocol Buffers" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["Google"],
    year: 2008,
    summary: {
      es: "Protocol Buffers es un formato binario de Google para serializar datos a partir de un esquema. Es mucho más compacto y rápido de procesar que JSON, a cambio de no ser legible a simple vista.",
      en: "Protocol Buffers is Google's binary format for serialising data from a schema. It is far more compact and faster to process than JSON, at the cost of not being human-readable.",
    },
    everyday: {
      es: "Las llamadas gRPC entre microservicios, muchas APIs internas de Google y numerosos sistemas de telemetría.",
      en: "gRPC calls between microservices, many internal Google APIs and numerous telemetry systems.",
    },
    technical: [
      {
        es: "Los mensajes se definen en archivos .proto y el compilador protoc genera clases para C++, Java, Go, Python y otros lenguajes. Cada campo tiene un número único; en el cable, cada campo va precedido por una clave (número de campo << 3 | tipo de cable) y no se transmiten los nombres. Los tipos de cable principales son VARINT (0), I64 (1), LEN (2) e I32 (5).",
        en: "Messages are defined in .proto files and the protoc compiler generates classes for C++, Java, Go, Python and other languages. Each field has a unique number; on the wire each field is preceded by a key (field number << 3 | wire type) and names are never sent. The main wire types are VARINT (0), I64 (1), LEN (2) and I32 (5).",
      },
      {
        es: "Los enteros se codifican como varints: grupos de 7 bits en orden little-endian, con el bit alto como indicador de continuación, así que los valores pequeños ocupan un solo byte; los tipos sint usan ZigZag para que los negativos también sean cortos. Los decodificadores ignoran (y conservan) los campos desconocidos, lo que da compatibilidad hacia adelante y hacia atrás siempre que nunca se reutilice un número de campo.",
        en: "Integers are encoded as varints: 7-bit groups in little-endian order with the high bit as a continuation flag, so small values take a single byte; sint types use ZigZag so negatives are short too. Decoders skip (and preserve) unknown fields, giving forward and backward compatibility as long as field numbers are never reused.",
      },
      {
        es: "Google lo usaba internamente desde principios de los 2000 y lo publicó como código abierto en 2008. No es un estándar de un organismo como IETF o ISO: la referencia es la documentación oficial del proyecto, que ha pasado por proto2, proto3 y, más recientemente, «editions».",
        en: "Google used it internally from the early 2000s and open-sourced it in 2008. It is not a standard from a body such as the IETF or ISO: the reference is the project's official documentation, which has gone through proto2, proto3 and, more recently, \"editions\".",
      },
    ],
    facts: [
      { label: { es: "Formato", en: "Format" }, value: { es: "Binario, requiere esquema (.proto)", en: "Binary, schema-based (.proto)" } },
      { label: { es: "Autodescriptivo", en: "Self-describing" }, value: { es: "No (solo números de campo)", en: "No (field numbers only)" } },
      { label: { es: "Enteros", en: "Integers" }, value: { es: "Varint de 1 a 10 B", en: "Varint, 1 to 10 B" } },
      { label: { es: "Evolución", en: "Evolution" }, value: { es: "Campos nuevos compatibles si no se reutilizan números", en: "New fields compatible if numbers are not reused" } },
    ],
    security: {
      es: "Un mensaje malicioso puede declarar longitudes enormes o anidamiento profundo para agotar memoria o pila; las bibliotecas imponen límites de tamaño y recursión. Como el formato no se autodescribe, hay que validar la semántica de los valores en la aplicación: el esquema garantiza tipos, no reglas de negocio.",
      en: "A malicious message may declare huge lengths or deep nesting to exhaust memory or stack; libraries enforce size and recursion limits. Since the format is not self-describing, value semantics must be validated in the application: the schema guarantees types, not business rules.",
    },
    tools: [
      { command: "protoc --decode_raw < msg.bin", description: { es: "Decodifica un mensaje sin esquema, mostrando números de campo", en: "Decodes a message without a schema, showing field numbers" } },
      { command: "protoc --python_out=. user.proto", description: { es: "Genera código Python a partir de un .proto", en: "Generates Python code from a .proto file" } },
    ],
    wireshark: "protobuf",
    relations: { usedBy: ["grpc"] },
    specs: [
      { id: "Protocol Buffers docs", title: { es: "Documentación oficial y codificación en el cable", en: "Official documentation and wire encoding" }, url: "https://protobuf.dev/programming-guides/encoding/" },
    ],
  },
  {
    id: "cbor",
    acronym: "CBOR",
    fullName: { es: "Representación Concisa de Objetos Binarios", en: "Concise Binary Object Representation" },
    osi: [6],
    category: "encoding",
    status: "current",
    bodies: ["IETF"],
    year: 2013,
    summary: {
      es: "CBOR es como un JSON binario: representa los mismos tipos de datos (mapas, listas, números, textos) pero en pocos bytes y con soporte nativo para datos binarios. Está pensado para dispositivos con poca memoria y energía.",
      en: "CBOR is like binary JSON: it represents the same kinds of data (maps, lists, numbers, strings) in few bytes and with native support for binary data. It is designed for devices with little memory and power.",
    },
    everyday: {
      es: "Las llaves de seguridad y passkeys (WebAuthn/FIDO2 usan CBOR y COSE), sensores IoT con CoAP y los certificados COVID digitales de la UE.",
      en: "Security keys and passkeys (WebAuthn/FIDO2 use CBOR and COSE), IoT sensors using CoAP, and the EU Digital COVID Certificates.",
    },
    technical: [
      {
        es: "Cada elemento comienza con un byte inicial: los 3 bits altos indican el tipo mayor (0 entero sin signo, 1 entero negativo, 2 cadena de bytes, 3 cadena de texto UTF-8, 4 arreglo, 5 mapa, 6 etiqueta semántica, 7 flotantes y valores simples) y los 5 bits bajos llevan el valor o la longitud, o indican cuántos bytes adicionales la contienen. Así, los enteros pequeños ocupan un solo byte y el formato se decodifica sin esquema.",
        en: "Each item begins with an initial byte: the top 3 bits give the major type (0 unsigned integer, 1 negative integer, 2 byte string, 3 UTF-8 text string, 4 array, 5 map, 6 semantic tag, 7 floats and simple values) and the low 5 bits hold the value or length, or say how many extra bytes contain it. Small integers thus take one byte and the format decodes without a schema.",
      },
      {
        es: "Las etiquetas (tags) añaden semántica, como fechas, números grandes o URIs, y el registro es extensible en IANA. RFC 8949 (2020, STD 94) reemplazó a RFC 7049 (2013) y define una codificación determinista, necesaria para firmas. CDDL (RFC 8610) sirve para describir esquemas, y COSE (RFC 9052) aporta firma y cifrado sobre CBOR.",
        en: "Tags add semantics such as dates, bignums or URIs, and the registry is extensible at IANA. RFC 8949 (2020, STD 94) replaced RFC 7049 (2013) and defines deterministic encoding, needed for signatures. CDDL (RFC 8610) describes schemas, and COSE (RFC 9052) provides signing and encryption over CBOR.",
      },
    ],
    facts: [
      { label: { es: "Tipos mayores", en: "Major types" }, value: { es: "8 (3 bits del byte inicial)", en: "8 (3 bits of the initial byte)" } },
      { label: { es: "Autodescriptivo", en: "Self-describing" }, value: { es: "Sí, no requiere esquema", en: "Yes, no schema required" } },
      { label: { es: "Tipo de medio", en: "Media type" }, value: "application/cbor" },
      { label: { es: "Esquemas", en: "Schemas" }, value: "CDDL (RFC 8610)" },
    ],
    security: {
      es: "Como cualquier decodificador, debe limitar longitudes declaradas y profundidad de anidamiento. Para firmar datos CBOR hay que usar la codificación determinista o firmar los bytes tal como se recibieron (como hace COSE), porque el mismo valor puede codificarse de varias formas.",
      en: "Like any decoder, it must bound declared lengths and nesting depth. To sign CBOR data one must use deterministic encoding or sign the bytes exactly as received (as COSE does), because the same value can be encoded in several ways.",
    },
    tools: [
      { command: "python3 -m cbor2.tool data.cbor", description: { es: "Convierte CBOR a JSON legible (paquete cbor2)", en: "Converts CBOR to readable JSON (cbor2 package)" } },
    ],
    wireshark: "cbor",
    relations: { usedBy: ["coap"] },
    specs: [
      { id: "RFC 8949", title: { es: "Concise Binary Object Representation (CBOR)", en: "Concise Binary Object Representation (CBOR)" }, url: rfc(8949) },
      { id: "RFC 8610", title: { es: "Lenguaje de definición CDDL", en: "Concise Data Definition Language (CDDL)" }, url: rfc(8610) },
      { id: "RFC 9052", title: { es: "COSE: estructuras y proceso", en: "CBOR Object Signing and Encryption (COSE): Structures and Process" }, url: rfc(9052) },
    ],
  },
  {
    id: "utf8",
    acronym: "UTF-8",
    fullName: { es: "Formato de Transformación Unicode de 8 bits", en: "Unicode Transformation Format – 8-bit" },
    osi: [6],
    category: "text",
    status: "current",
    bodies: ["Unicode", "IETF", "ISO/IEC"],
    year: 1993,
    summary: {
      es: "UTF-8 es la forma estándar de convertir texto de cualquier idioma —incluidos acentos, ñ, chino o emojis— en bytes. Es compatible con ASCII y hoy es la codificación de casi toda la web.",
      en: "UTF-8 is the standard way of turning text in any language—including accents, ñ, Chinese or emoji—into bytes. It is ASCII-compatible and today encodes almost the entire web.",
    },
    analogy: {
      es: "Como un sistema de paquetería donde las cartas cortas van en sobre pequeño y las largas en sobres de 2, 3 o 4 compartimentos, y cada sobre indica en su primer sello cuántos compartimentos tiene.",
      en: "Like a parcel system where short letters go in a small envelope and longer ones in envelopes with 2, 3 or 4 compartments, and each envelope's first stamp says how many compartments it has.",
    },
    everyday: {
      es: "Cuando un texto aparece como «Ã±» en lugar de «ñ», es porque se leyó UTF-8 como si fuera Latin-1.",
      en: "When text shows up as \"Ã±\" instead of \"ñ\", it is because UTF-8 was read as if it were Latin-1.",
    },
    technical: [
      {
        es: "Unicode asigna un número (punto de código) a cada carácter, de U+0000 a U+10FFFF; UTF-8 lo convierte en 1 a 4 bytes. U+0000–U+007F ocupan 1 byte (idéntico a ASCII), hasta U+07FF 2 bytes, hasta U+FFFF 3 bytes y el resto 4 bytes. El primer byte indica la longitud (0xxxxxxx, 110xxxxx, 1110xxxx, 11110xxx) y los de continuación empiezan por 10, así que siempre es posible resincronizar a mitad de un flujo.",
        en: "Unicode assigns a number (code point) to each character, from U+0000 to U+10FFFF; UTF-8 turns it into 1 to 4 bytes. U+0000–U+007F take 1 byte (identical to ASCII), up to U+07FF 2 bytes, up to U+FFFF 3 bytes and the rest 4 bytes. The lead byte signals the length (0xxxxxxx, 110xxxxx, 1110xxxx, 11110xxx) and continuation bytes start with 10, so a decoder can always resynchronise mid-stream.",
      },
      {
        es: "Ken Thompson y Rob Pike lo diseñaron en 1992 para el sistema Plan 9 y se presentó públicamente en 1993; la IETF lo describió en RFC 2044 (1996) y RFC 2279 (1998). RFC 3629 (2003, STD 63) es la especificación vigente: limita la codificación a 4 bytes (hasta U+10FFFF) en línea con Unicode e ISO/IEC 10646, y prohíbe codificar sustitutos (U+D800–U+DFFF).",
        en: "Ken Thompson and Rob Pike designed it in 1992 for the Plan 9 system and it was presented publicly in 1993; the IETF described it in RFC 2044 (1996) and RFC 2279 (1998). RFC 3629 (2003, STD 63) is the current specification: it limits the encoding to 4 bytes (up to U+10FFFF) in line with Unicode and ISO/IEC 10646, and forbids encoding surrogates (U+D800–U+DFFF).",
      },
      {
        es: "No depende del orden de bytes, por lo que no necesita BOM (el prefijo EF BB BF se desaconseja en protocolos). JSON exige UTF-8, es la codificación por defecto de XML y HTML5, y RFC 2277 establece que los protocolos de la IETF deben soportarlo.",
        en: "It is byte-order independent, so it needs no BOM (the EF BB BF prefix is discouraged in protocols). JSON mandates UTF-8, it is the default for XML and HTML5, and RFC 2277 requires IETF protocols to support it.",
      },
    ],
    facts: [
      { label: { es: "Longitud", en: "Length" }, value: { es: "1 a 4 B por carácter", en: "1 to 4 B per character" } },
      { label: { es: "Compatible con ASCII", en: "ASCII-compatible" }, value: { es: "Sí, byte a byte", en: "Yes, byte for byte" } },
      { label: { es: "Rango", en: "Range" }, value: "U+0000 – U+10FFFF" },
      { label: { es: "Orden de bytes", en: "Byte order" }, value: { es: "Irrelevante (sin BOM)", en: "Irrelevant (no BOM needed)" } },
    ],
    security: {
      es: "Las codificaciones sobrelargas (overlong), como 0xC0 0xAF para «/», están prohibidas porque permitían burlar filtros; así se explotó el recorrido de directorios en servidores IIS alrededor de 2000. También hay riesgos por caracteres visualmente idénticos (homógrafos) en dominios y nombres de usuario. Los decodificadores deben rechazar secuencias inválidas y normalizar antes de comparar.",
      en: "Overlong encodings, such as 0xC0 0xAF for \"/\", are forbidden because they allowed filters to be bypassed; that is how directory traversal was exploited on IIS servers around 2000. Visually identical characters (homographs) in domains and user names are another risk. Decoders must reject invalid sequences and normalise before comparing.",
    },
    tools: [
      { command: "iconv -f ISO-8859-1 -t UTF-8 in.txt > out.txt", description: { es: "Convierte un archivo de Latin-1 a UTF-8", en: "Converts a file from Latin-1 to UTF-8" } },
      { command: "echo -n 'ñ' | xxd", description: { es: "Muestra los bytes UTF-8 de un carácter (c3 b1)", en: "Shows a character's UTF-8 bytes (c3 b1)" } },
      { command: "file -i archivo.txt", description: { es: "Detecta la codificación de un archivo de texto", en: "Detects a text file's encoding" } },
    ],
    relations: { usedBy: ["json", "xml", "mime", "http1", "smtp", "cbor"] },
    specs: [
      { id: "RFC 3629", title: { es: "UTF-8, un formato de transformación de ISO 10646", en: "UTF-8, a transformation format of ISO 10646" }, url: rfc(3629) },
      { id: "The Unicode Standard", title: { es: "El estándar Unicode (versión más reciente)", en: "The Unicode Standard (latest version)" }, url: "https://www.unicode.org/versions/latest/" },
      { id: "ISO/IEC 10646", title: { es: "Conjunto universal de caracteres codificados (UCS)", en: "Universal Coded Character Set (UCS)" } },
    ],
  },
  {
    id: "base64",
    acronym: "Base64",
    fullName: { es: "Codificación Base64", en: "Base64 Encoding" },
    osi: [6],
    category: "text",
    status: "current",
    bodies: ["IETF"],
    year: 1992,
    summary: {
      es: "Base64 convierte datos binarios (una imagen, una clave) en texto formado solo por letras, números y unos pocos símbolos, para que puedan viajar por canales pensados para texto. No es cifrado: cualquiera puede decodificarlo.",
      en: "Base64 turns binary data (an image, a key) into text made only of letters, digits and a few symbols so it can travel over channels built for text. It is not encryption: anyone can decode it.",
    },
    everyday: {
      es: "Los adjuntos de correo, las imágenes incrustadas en páginas (data:image/png;base64,…), los tokens JWT y los certificados en formato PEM.",
      en: "Email attachments, images embedded in pages (data:image/png;base64,…), JWT tokens and certificates in PEM format.",
    },
    technical: [
      {
        es: "Toma grupos de 3 bytes (24 bits) y los divide en 4 valores de 6 bits, cada uno representado por un carácter del alfabeto A–Z, a–z, 0–9, «+» y «/». Si al final sobran 1 o 2 bytes, se rellena con «=». El resultado es un 33 % más grande que el original (4 caracteres por cada 3 bytes), más los saltos de línea cada 76 caracteres que exige MIME.",
        en: "It takes groups of 3 bytes (24 bits) and splits them into four 6-bit values, each represented by a character from the alphabet A–Z, a–z, 0–9, \"+\" and \"/\". If 1 or 2 bytes are left over, the output is padded with \"=\". The result is 33 % larger than the original (4 characters for every 3 bytes), plus the line breaks every 76 characters that MIME requires.",
      },
      {
        es: "Se definió como codificación de transferencia de MIME en 1992 (RFC 1341, luego RFC 2045), con antecedentes en el correo seguro PEM. RFC 4648 (2006) es la referencia vigente: define también la variante base64url, que usa «-» y «_» en lugar de «+» y «/» para que el resultado sea seguro en URLs y nombres de archivo (JWT la usa sin relleno), además de Base32 y Base16.",
        en: "It was defined as a MIME transfer encoding in 1992 (RFC 1341, later RFC 2045), with roots in PEM secure mail. RFC 4648 (2006) is the current reference: it also defines the base64url variant, which uses \"-\" and \"_\" instead of \"+\" and \"/\" so output is safe in URLs and file names (JWT uses it without padding), as well as Base32 and Base16.",
      },
    ],
    facts: [
      { label: { es: "Relación", en: "Ratio" }, value: { es: "3 bytes → 4 caracteres", en: "3 bytes → 4 characters" } },
      { label: { es: "Sobrecarga", en: "Overhead" }, value: { es: "≈ 33 %", en: "≈ 33 %" } },
      { label: { es: "Relleno", en: "Padding" }, value: { es: "«=» (opcional en base64url)", en: "\"=\" (optional in base64url)" } },
      { label: { es: "¿Cifra?", en: "Encrypts?" }, value: { es: "No: es codificación reversible", en: "No: it is reversible encoding" } },
    ],
    security: {
      es: "Base64 no protege nada: la autenticación HTTP Basic envía usuario y contraseña solo en Base64, por lo que sin TLS viajan prácticamente en claro. También se usa para ocultar cargas maliciosas a filtros simples, y las diferencias entre decodificadores (relleno, caracteres inválidos) pueden causar inconsistencias de validación.",
      en: "Base64 protects nothing: HTTP Basic authentication sends user name and password merely in Base64, so without TLS they travel practically in cleartext. It is also used to hide malicious payloads from naive filters, and differences between decoders (padding, invalid characters) can cause validation inconsistencies.",
    },
    tools: [
      { command: "base64 archivo.bin", description: { es: "Codifica un archivo en Base64", en: "Encodes a file in Base64" } },
      { command: "echo 'aG9sYQ==' | base64 -d", description: { es: "Decodifica una cadena Base64 («hola»)", en: "Decodes a Base64 string (\"hola\")" } },
      { command: "openssl base64 -in cert.der", description: { es: "Codifica con OpenSSL (como en PEM)", en: "Encodes with OpenSSL (as in PEM)" } },
    ],
    relations: { usedBy: ["mime", "smtp", "http1", "json"] },
    specs: [
      { id: "RFC 4648", title: { es: "Codificaciones Base16, Base32 y Base64", en: "The Base16, Base32, and Base64 Data Encodings" }, url: rfc(4648) },
      { id: "RFC 2045", title: { es: "MIME parte 1 (Content-Transfer-Encoding: base64)", en: "MIME Part One (Content-Transfer-Encoding: base64)" }, url: rfc(2045) },
    ],
  },
  {
    id: "compression",
    acronym: "DEFLATE/Brotli/zstd",
    fullName: { es: "Compresión de datos (DEFLATE, gzip, Brotli, Zstandard)", en: "Data compression (DEFLATE, gzip, Brotli, Zstandard)" },
    osi: [6],
    category: "compression",
    status: "current",
    bodies: ["IETF"],
    year: 1996,
    identifiers: ["Content-Encoding: gzip, deflate, br, zstd"],
    summary: {
      es: "La compresión reduce el tamaño de los datos antes de enviarlos, para que lleguen antes y consuman menos ancho de banda. En la web, el servidor comprime páginas, scripts y hojas de estilo, y el navegador los descomprime al vuelo.",
      en: "Compression shrinks data before sending it so it arrives faster and uses less bandwidth. On the web, the server compresses pages, scripts and stylesheets, and the browser decompresses them on the fly.",
    },
    analogy: {
      es: "Como empacar al vacío la ropa de una maleta: el contenido es el mismo, pero ocupa mucho menos espacio durante el viaje.",
      en: "Like vacuum-packing the clothes in a suitcase: the contents are the same, but they take far less space during the trip.",
    },
    everyday: {
      es: "Casi toda página web se descarga comprimida con gzip, Brotli o Zstandard; también los archivos .zip y .gz.",
      en: "Nearly every web page downloads compressed with gzip, Brotli or Zstandard; so do .zip and .gz files.",
    },
    technical: [
      {
        es: "DEFLATE (RFC 1951, 1996) combina LZ77, que sustituye secuencias repetidas por referencias (distancia, longitud) dentro de una ventana de 32 KiB, con codificación Huffman. Es la base de zlib (RFC 1950), gzip (RFC 1952), ZIP y PNG. Brotli (RFC 7932, 2016), de Google, añade un diccionario estático integrado y ventanas mayores, y comprime mejor el texto web. Zstandard (RFC 8878, 2021; antes RFC 8478), de Meta, ofrece ratios similares con velocidades de descompresión muy altas.",
        en: "DEFLATE (RFC 1951, 1996) combines LZ77, which replaces repeated sequences with (distance, length) references within a 32 KiB window, with Huffman coding. It underlies zlib (RFC 1950), gzip (RFC 1952), ZIP and PNG. Google's Brotli (RFC 7932, 2016) adds a built-in static dictionary and larger windows, compressing web text better. Meta's Zstandard (RFC 8878, 2021; formerly RFC 8478) offers similar ratios with very high decompression speed.",
      },
      {
        es: "En HTTP, el cliente anuncia lo que acepta con Accept-Encoding y el servidor indica lo aplicado con Content-Encoding (RFC 9110). Las cabeceras se comprimen aparte con HPACK en HTTP/2 y QPACK en HTTP/3, diseñados para resistir ataques como CRIME. La compresión también existe en otras capas, por ejemplo IPComp en L3 o en PPP, lo que muestra que la asignación a L6 es sobre todo conceptual.",
        en: "In HTTP, the client advertises what it accepts with Accept-Encoding and the server states what it applied with Content-Encoding (RFC 9110). Headers are compressed separately with HPACK in HTTP/2 and QPACK in HTTP/3, designed to resist attacks like CRIME. Compression also exists at other layers, such as IPComp at L3 or in PPP, which shows that assigning it to L6 is mostly conceptual.",
      },
    ],
    facts: [
      { label: { es: "DEFLATE", en: "DEFLATE" }, value: { es: "LZ77 + Huffman, ventana de 32 KiB (RFC 1951)", en: "LZ77 + Huffman, 32 KiB window (RFC 1951)" } },
      { label: { es: "Brotli", en: "Brotli" }, value: { es: "RFC 7932 (2016), token «br»", en: "RFC 7932 (2016), \"br\" token" } },
      { label: { es: "Zstandard", en: "Zstandard" }, value: { es: "RFC 8878 (2021), token «zstd»", en: "RFC 8878 (2021), \"zstd\" token" } },
      { label: { es: "Tipo", en: "Type" }, value: { es: "Sin pérdida", en: "Lossless" } },
    ],
    security: {
      es: "Comprimir datos secretos junto con datos que controla el atacante filtra información por el tamaño resultante: CRIME (2012) lo explotó contra la compresión de TLS y SPDY, y BREACH (2013) contra el cuerpo HTTP comprimido. Por eso TLS 1.3 eliminó la compresión. Además, las «bombas de descompresión» (archivos diminutos que se expanden a gigabytes) exigen limitar el tamaño descomprimido.",
      en: "Compressing secrets together with attacker-controlled data leaks information through the resulting size: CRIME (2012) exploited this against TLS and SPDY compression, and BREACH (2013) against compressed HTTP bodies. That is why TLS 1.3 removed compression. In addition, \"decompression bombs\" (tiny files that expand to gigabytes) require capping the decompressed size.",
    },
    tools: [
      { command: "curl -sI -H 'Accept-Encoding: br, gzip' https://example.com", description: { es: "Muestra qué Content-Encoding aplica el servidor", en: "Shows which Content-Encoding the server applies" } },
      { command: "gzip -9 -k archivo.txt", description: { es: "Comprime con DEFLATE al nivel máximo conservando el original", en: "Compresses with DEFLATE at maximum level, keeping the original" } },
      { command: "zstd -19 archivo.txt", description: { es: "Comprime con Zstandard", en: "Compresses with Zstandard" } },
    ],
    wireshark: "http.content_encoding",
    relations: { usedBy: ["http1", "http2", "http3", "ppp", "image-formats"] },
    specs: [
      { id: "RFC 1951", title: { es: "Especificación del formato DEFLATE 1.3", en: "DEFLATE Compressed Data Format Specification version 1.3" }, url: rfc(1951) },
      { id: "RFC 1952", title: { es: "Especificación del formato gzip 4.3", en: "GZIP file format specification version 4.3" }, url: rfc(1952) },
      { id: "RFC 7932", title: { es: "Formato de datos comprimidos Brotli", en: "Brotli Compressed Data Format" }, url: rfc(7932) },
      { id: "RFC 8878", title: { es: "Zstandard y el tipo de medio application/zstd", en: "Zstandard Compression and the 'application/zstd' Media Type" }, url: rfc(8878) },
    ],
  },
  {
    id: "image-formats",
    acronym: "JPEG/PNG/WebP/AVIF",
    fullName: { es: "Formatos de imagen (JPEG, PNG, WebP, AVIF)", en: "Image formats (JPEG, PNG, WebP, AVIF)" },
    osi: [6],
    category: "formats",
    status: "current",
    bodies: ["ISO/IEC", "ITU-T", "W3C"],
    year: 1992,
    identifiers: ["image/jpeg", "image/png", "image/webp", "image/avif"],
    summary: {
      es: "Los formatos de imagen definen cómo se guardan y transmiten las fotos y gráficos. Algunos sacrifican algo de calidad para ocupar poco (JPEG), otros conservan cada píxel exacto (PNG), y los modernos (WebP, AVIF) logran lo mismo en menos bytes.",
      en: "Image formats define how photos and graphics are stored and transmitted. Some give up a little quality to stay small (JPEG), others keep every pixel exact (PNG), and modern ones (WebP, AVIF) achieve the same in fewer bytes.",
    },
    everyday: {
      es: "Las fotos del celular (JPEG o HEIC), los logos y capturas de pantalla (PNG) y las imágenes optimizadas de los sitios web (WebP, AVIF).",
      en: "Phone photos (JPEG or HEIC), logos and screenshots (PNG), and the optimised images on websites (WebP, AVIF).",
    },
    technical: [
      {
        es: "JPEG (ISO/IEC 10918-1 = ITU-T T.81, 1992) es un formato con pérdida: convierte la imagen a luminancia y crominancia, aplica la transformada discreta del coseno (DCT) en bloques de 8×8, cuantiza los coeficientes (donde se pierde información) y los comprime con Huffman. Un archivo JPEG empieza con los bytes FF D8.",
        en: "JPEG (ISO/IEC 10918-1 = ITU-T T.81, 1992) is lossy: it converts the image to luminance and chrominance, applies the discrete cosine transform (DCT) to 8×8 blocks, quantises the coefficients (where information is lost) and compresses them with Huffman coding. A JPEG file starts with the bytes FF D8.",
      },
      {
        es: "PNG es sin pérdida y admite transparencia (canal alfa). Aplica filtros de predicción por fila y comprime con DEFLATE, organizando el archivo en chunks (IHDR, IDAT, IEND) tras una firma de 8 bytes. Nació en 1996 como alternativa libre a GIF, cuyo algoritmo LZW estaba patentado; es Recomendación del W3C y norma ISO/IEC 15948:2004.",
        en: "PNG is lossless and supports transparency (alpha channel). It applies per-row prediction filters and compresses with DEFLATE, organising the file into chunks (IHDR, IDAT, IEND) after an 8-byte signature. It was born in 1996 as a free alternative to GIF, whose LZW algorithm was patented; it is a W3C Recommendation and ISO/IEC 15948:2004.",
      },
      {
        es: "WebP (Google, 2010; documentado en RFC 9649) ofrece modos con y sin pérdida basados en VP8. AVIF, de la Alliance for Open Media, guarda imágenes codificadas con AV1 en el contenedor HEIF (ISO/IEC 23008-12) y suele comprimir aún más. El formato real se identifica por los bytes iniciales («números mágicos») y por el tipo MIME, no por la extensión del archivo.",
        en: "WebP (Google, 2010; documented in RFC 9649) offers lossy and lossless modes based on VP8. AVIF, from the Alliance for Open Media, stores AV1-coded images in the HEIF container (ISO/IEC 23008-12) and usually compresses further. The real format is identified by the leading bytes (\"magic numbers\") and the MIME type, not by the file extension.",
      },
    ],
    facts: [
      { label: { es: "JPEG", en: "JPEG" }, value: { es: "Con pérdida, DCT 8×8 (ISO/IEC 10918-1)", en: "Lossy, 8×8 DCT (ISO/IEC 10918-1)" } },
      { label: { es: "PNG", en: "PNG" }, value: { es: "Sin pérdida, DEFLATE, canal alfa (ISO/IEC 15948)", en: "Lossless, DEFLATE, alpha channel (ISO/IEC 15948)" } },
      { label: { es: "WebP", en: "WebP" }, value: { es: "Con o sin pérdida, basado en VP8", en: "Lossy or lossless, VP8-based" } },
      { label: { es: "AVIF", en: "AVIF" }, value: { es: "AV1 en contenedor HEIF", en: "AV1 in a HEIF container" } },
    ],
    security: {
      es: "Los decodificadores de imágenes procesan datos no confiables y son un blanco frecuente: la vulnerabilidad de libwebp CVE-2023-4863 se explotó activamente en 2023 y afectó a navegadores y apps. Además, los metadatos EXIF de las fotos pueden revelar la ubicación GPS, la fecha y el modelo del dispositivo; conviene eliminarlos antes de publicar.",
      en: "Image decoders process untrusted data and are a frequent target: the libwebp vulnerability CVE-2023-4863 was actively exploited in 2023 and affected browsers and apps. In addition, photo EXIF metadata can reveal GPS location, date and device model; stripping it before publishing is advisable.",
    },
    tools: [
      { command: "file foto.jpg", description: { es: "Identifica el formato real por sus bytes iniciales", en: "Identifies the real format from its leading bytes" } },
      { command: "exiftool foto.jpg", description: { es: "Muestra los metadatos EXIF (GPS, cámara, fecha)", en: "Shows EXIF metadata (GPS, camera, date)" } },
      { command: "identify -verbose imagen.png", description: { es: "Detalla dimensiones, profundidad y compresión (ImageMagick)", en: "Details dimensions, depth and compression (ImageMagick)" } },
    ],
    wireshark: "png || image-jfif",
    relations: { dependsOn: ["compression"], usedBy: ["http1", "http2", "mime"] },
    specs: [
      { id: "ITU-T T.81", title: { es: "JPEG: compresión digital de imágenes fijas de tono continuo", en: "JPEG: Digital compression and coding of continuous-tone still images" }, url: "https://www.itu.int/rec/T-REC-T.81" },
      { id: "ISO/IEC 15948:2004", title: { es: "Portable Network Graphics (PNG)", en: "Portable Network Graphics (PNG)" } },
      { id: "W3C PNG", title: { es: "Especificación PNG del W3C", en: "W3C PNG Specification" }, url: "https://www.w3.org/TR/png/" },
      { id: "RFC 9649", title: { es: "Formato de imagen WebP", en: "WebP Image Format" }, url: rfc(9649) },
    ],
  },
  {
    id: "video-codecs",
    acronym: "H.264/HEVC/AV1",
    fullName: { es: "Códecs de video (MPEG-2, H.264, H.265, AV1)", en: "Video codecs (MPEG-2, H.264, H.265, AV1)" },
    osi: [6],
    category: "formats",
    status: "current",
    bodies: ["ITU-T", "ISO/IEC"],
    year: 1988,
    summary: {
      es: "Un códec de video comprime las imágenes en movimiento aprovechando que un fotograma se parece mucho al anterior, y reduce el tamaño cientos de veces. El contenedor (MP4, MKV, WebM) es la «caja» que junta el video, el audio y los subtítulos.",
      en: "A video codec compresses moving pictures by exploiting how much each frame resembles the previous one, shrinking size by hundreds of times. The container (MP4, MKV, WebM) is the \"box\" that bundles video, audio and subtitles together.",
    },
    analogy: {
      es: "Como un animador que dibuja completo solo un cuadro de vez en cuando y, en los demás, anota únicamente lo que se movió.",
      en: "Like an animator who draws a full frame only every so often and, for the rest, just notes what moved.",
    },
    everyday: {
      es: "Streaming (Netflix, YouTube), videollamadas, televisión digital y los videos que grabas con el celular.",
      en: "Streaming (Netflix, YouTube), video calls, digital TV and the videos you record on your phone.",
    },
    technical: [
      {
        es: "Los códecs híbridos dividen cada imagen en bloques, predicen cada bloque a partir de la misma imagen (intra) o de otras ya decodificadas mediante vectores de movimiento (inter), y codifican solo el residuo con una transformada, cuantización y codificación entrópica. Los fotogramas I son independientes, los P se predicen desde anteriores y los B desde anteriores y posteriores; un GOP es la secuencia entre dos fotogramas I.",
        en: "Hybrid codecs split each picture into blocks, predict each block from the same picture (intra) or from already-decoded ones via motion vectors (inter), and code only the residual with a transform, quantisation and entropy coding. I-frames are self-contained, P-frames are predicted from earlier frames and B-frames from earlier and later ones; a GOP is the sequence between two I-frames.",
      },
      {
        es: "La mayoría son normas conjuntas de ITU-T y ISO/IEC: H.261 (1988) fue el primer códec digital práctico; MPEG-2 Video (ISO/IEC 13818-2 = H.262) llevó la TV digital y el DVD; H.264/AVC (ITU-T H.264 = ISO/IEC 14496-10, 2003) domina todavía; H.265/HEVC (2013) reduce el caudal a la mitad para la misma calidad y H.266/VVC (2020) sigue esa línea. AV1 (Alliance for Open Media, 2018) es una alternativa libre de regalías, usada ampliamente en streaming.",
        en: "Most are joint ITU-T and ISO/IEC standards: H.261 (1988) was the first practical digital codec; MPEG-2 Video (ISO/IEC 13818-2 = H.262) carried digital TV and DVD; H.264/AVC (ITU-T H.264 = ISO/IEC 14496-10, 2003) still dominates; H.265/HEVC (2013) halves the bitrate for the same quality and H.266/VVC (2020) continues that path. AV1 (Alliance for Open Media, 2018) is a royalty-free alternative widely used in streaming.",
      },
      {
        es: "Códec y contenedor son cosas distintas: un .mp4 (ISO Base Media File Format, ISO/IEC 14496-12) puede llevar H.264, HEVC o AV1, y MPEG-2 Transport Stream (paquetes de 188 bytes) se usa en TV y en HLS. Para enviarlos por RTP existen formatos de carga útil específicos, como RFC 6184 para H.264 y RFC 7798 para HEVC.",
        en: "Codec and container are different things: an .mp4 (ISO Base Media File Format, ISO/IEC 14496-12) can carry H.264, HEVC or AV1, and MPEG-2 Transport Stream (188-byte packets) is used in TV and HLS. To send them over RTP there are specific payload formats, such as RFC 6184 for H.264 and RFC 7798 for HEVC.",
      },
    ],
    facts: [
      { label: { es: "H.264/AVC", en: "H.264/AVC" }, value: "ITU-T H.264 = ISO/IEC 14496-10 (2003)" },
      { label: { es: "H.265/HEVC", en: "H.265/HEVC" }, value: "ITU-T H.265 = ISO/IEC 23008-2 (2013)" },
      { label: { es: "AV1", en: "AV1" }, value: { es: "AOMedia (2018), libre de regalías", en: "AOMedia (2018), royalty-free" } },
      { label: { es: "Contenedores", en: "Containers" }, value: "MP4, MPEG-TS, Matroska/WebM" },
      { label: { es: "Tipos de fotograma", en: "Frame types" }, value: "I, P, B" },
    ],
    security: {
      es: "Los analizadores de contenedores y códecs manejan datos complejos y no confiables: Stagefright (2015) permitía ejecutar código en Android con un simple MP4 malicioso. El contenido protegido se cifra con Common Encryption (ISO/IEC 23001-7) y sistemas DRM como Widevine, PlayReady o FairPlay.",
      en: "Container and codec parsers handle complex, untrusted data: Stagefright (2015) allowed code execution on Android with just a malicious MP4. Protected content is encrypted with Common Encryption (ISO/IEC 23001-7) and DRM systems such as Widevine, PlayReady or FairPlay.",
    },
    tools: [
      { command: "ffprobe video.mp4", description: { es: "Muestra contenedor, códecs, resolución y caudal", en: "Shows container, codecs, resolution and bitrate" } },
      { command: "ffmpeg -i in.mov -c:v libx264 -crf 23 out.mp4", description: { es: "Recodifica a H.264 con calidad constante", en: "Re-encodes to H.264 at constant quality" } },
      { command: "mediainfo video.mkv", description: { es: "Detalla perfiles, niveles y pistas", en: "Details profiles, levels and tracks" } },
    ],
    wireshark: "h264",
    relations: { usedBy: ["rtsp", "sip", "http1", "http3"] },
    specs: [
      { id: "ITU-T H.264", title: { es: "Codificación de video avanzada (AVC)", en: "Advanced video coding for generic audiovisual services" }, url: "https://www.itu.int/rec/T-REC-H.264" },
      { id: "ITU-T H.265", title: { es: "Codificación de video de alta eficiencia (HEVC)", en: "High efficiency video coding" }, url: "https://www.itu.int/rec/T-REC-H.265" },
      { id: "ISO/IEC 13818-2", title: { es: "MPEG-2 Video (= ITU-T H.262)", en: "MPEG-2 Video (= ITU-T H.262)" } },
      { id: "RFC 6184", title: { es: "Formato de carga RTP para H.264", en: "RTP Payload Format for H.264 Video" }, url: rfc(6184) },
    ],
  },
];
