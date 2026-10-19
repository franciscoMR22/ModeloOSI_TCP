import type { Language } from "@/lib/network-data";
import type { SectionId } from "@/components/navbar";

export interface TourStep {
  id: string;
  /** Valor de `data-tour` del elemento a iluminar; null = paso centrado, sin foco. */
  target: string | null;
  /** Sección que debe estar activa para que el objetivo exista; null = no navega. */
  section: SectionId | null;
  title: Record<Language, string>;
  body: Record<Language, string>;
}

export const TOUR_STEPS: TourStep[] = [
  {
    id: "welcome",
    target: null,
    section: null,
    title: { es: "Bienvenido a NetStack", en: "Welcome to NetStack" },
    body: {
      es: "Un recorrido rápido para sacarle el máximo provecho al sitio: compara el modelo OSI y TCP/IP, explora protocolos y simula el viaje de un paquete.",
      en: "A quick tour to help you get the most out of the site: compare the OSI and TCP/IP models, explore protocols, and simulate a packet's journey.",
    },
  },
  {
    id: "nav-sections",
    target: "nav-sections",
    section: "hero",
    title: { es: "Secciones", en: "Sections" },
    body: {
      es: "Desde aquí saltas entre Capas, Simulador, Flujos, Excepciones y Práctica. Cada una es su propia vista, sin necesidad de hacer scroll.",
      en: "Jump between Layers, Simulator, Flows, Edge cases and Practice from here. Each one is its own view, no scrolling needed.",
    },
  },
  {
    id: "mode-toggle",
    target: "mode-toggle",
    section: "hero",
    title: { es: "Básico o Técnico", en: "Basic or Technical" },
    body: {
      es: "Cambia el nivel de explicación cuando quieras: Básico para una idea general, Técnico para detalles, RFCs y formatos de cabecera.",
      en: "Switch the explanation level anytime: Basic for the big picture, Technical for details, RFCs and header formats.",
    },
  },
  {
    id: "search",
    target: "search",
    section: "hero",
    title: { es: "Buscar un protocolo", en: "Search a protocol" },
    body: {
      es: "Pulsa Ctrl+K (o este botón) para encontrar al instante cualquiera de los más de 100 protocolos del catálogo.",
      en: "Press Ctrl+K (or this button) to instantly find any of the 100+ protocols in the catalog.",
    },
  },
  {
    id: "language",
    target: "language",
    section: "hero",
    title: { es: "Idioma", en: "Language" },
    body: {
      es: "Todo el contenido del sitio está disponible en español e inglés.",
      en: "All of the site's content is available in Spanish and English.",
    },
  },
  {
    id: "theme",
    target: "theme",
    section: "hero",
    title: { es: "Modo claro / oscuro", en: "Light / dark mode" },
    body: {
      es: "Cambia la apariencia del sitio cuando quieras. Justo a la derecha de este botón puedes reabrir esta guía siempre que la necesites.",
      en: "Switch the site's look whenever you like. Right next to this button you can reopen this guide any time you need it.",
    },
  },
  {
    id: "layers",
    target: "layer-card",
    section: "layers",
    title: { es: "Compara las capas", en: "Compare the layers" },
    body: {
      es: "Pulsa una tarjeta para expandirla y ver su descripción, protocolos y diagnóstico, en paralelo con su equivalente en el otro modelo.",
      en: "Click a card to expand it and see its description, protocols and troubleshooting, side by side with its counterpart in the other model.",
    },
  },
  {
    id: "simulator",
    target: "sim-play",
    section: "trace",
    title: { es: "Simulador de encapsulación", en: "Encapsulation simulator" },
    body: {
      es: "Dale a Reproducir para ver, byte a byte, cómo un dato se encapsula al enviarse y se desencapsula al llegar.",
      en: "Hit Play to watch, byte by byte, how data gets encapsulated on the way out and decapsulated on arrival.",
    },
  },
  {
    id: "flows",
    target: "flows-tabs",
    section: "flows",
    title: { es: "Flujos de comunicación", en: "Communication flows" },
    body: {
      es: "Mira handshakes reales (TCP, TLS, QUIC) o todo lo que pasa al escribir una URL, mensaje por mensaje y con el tiempo medido en RTT.",
      en: "Watch real handshakes (TCP, TLS, QUIC) or everything that happens when you type a URL, message by message, with time measured in RTT.",
    },
  },
  {
    id: "misfits",
    target: "misfit-card",
    section: "misfits",
    title: { es: "Donde el modelo no encaja", en: "Where the model doesn't fit" },
    body: {
      es: "Protocolos como ARP, TLS o BGP no caben en una sola capa de libro de texto. Aquí ves en qué capa «deberían» estar y en cuáles operan de verdad.",
      en: "Protocols like ARP, TLS, or BGP don't fit a single textbook layer. Here you see which layer they're «supposed» to be in and which ones they actually run on.",
    },
  },
  {
    id: "practice",
    target: "practice-controls",
    section: "practice",
    title: { es: "Pon a prueba lo aprendido", en: "Put it to the test" },
    body: {
      es: "Arrastra cada protocolo a su capa (o tócalo y luego toca la capa). Elige el modelo, la dificultad, y mira tus aciertos en tiempo real.",
      en: "Drag each protocol onto its layer (or tap it and then tap the layer). Pick the model, the difficulty, and watch your score in real time.",
    },
  },
  {
    id: "closing",
    target: null,
    section: null,
    title: { es: "Listo para explorar", en: "Ready to explore" },
    body: {
      es: "Eso es todo. Puedes reabrir esta guía cuando quieras desde el botón de ayuda, justo al lado del interruptor de tema.",
      en: "That's it. You can reopen this guide any time from the help button, right next to the theme switch.",
    },
  },
];
