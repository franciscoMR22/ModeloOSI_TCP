import type { L } from "@/lib/i18n";
import type { CategoryId, ProtocolStatus } from "@/lib/protocols/types";

export const CATEGORY_LABELS: Record<CategoryId, L> = {
  web: { es: "Web", en: "Web" },
  naming: { es: "Nombres", en: "Naming" },
  config: { es: "Configuración", en: "Configuration" },
  email: { es: "Correo", en: "Email" },
  transfer: { es: "Transferencia", en: "File transfer" },
  files: { es: "Archivos en red", en: "Network file systems" },
  remote: { es: "Acceso remoto", en: "Remote access" },
  messaging: { es: "Mensajería e IoT", en: "Messaging & IoT" },
  management: { es: "Gestión", en: "Management" },
  time: { es: "Tiempo", en: "Time" },
  auth: { es: "Autenticación y directorio", en: "Auth & directory" },
  media: { es: "Voz y video", en: "Voice & video" },
  routing: { es: "Enrutamiento", en: "Routing" },
  security: { es: "Seguridad", en: "Security" },
  encoding: { es: "Serialización", en: "Serialization" },
  text: { es: "Texto y codificación", en: "Text & encoding" },
  compression: { es: "Compresión", en: "Compression" },
  formats: { es: "Formatos multimedia", en: "Media formats" },
  rpc: { es: "Llamadas remotas", en: "Remote calls" },
  session: { es: "Control de sesión", en: "Session control" },
  tunneling: { es: "Túneles", en: "Tunneling" },
  proxy: { es: "Proxy", en: "Proxy" },
  transport: { es: "Transporte", en: "Transport" },
  extensions: { es: "Extensiones", en: "Extensions" },
  addressing: { es: "Direccionamiento", en: "Addressing" },
  control: { es: "Control y diagnóstico", en: "Control & diagnostics" },
  translation: { es: "Traducción", en: "Translation" },
  framing: { es: "Tramado", en: "Framing" },
  switching: { es: "Conmutación", en: "Switching" },
  discovery: { es: "Descubrimiento", en: "Discovery" },
  resolution: { es: "Resolución", en: "Resolution" },
  wireless: { es: "Inalámbrico", en: "Wireless" },
  wan: { es: "WAN", en: "WAN" },
  copper: { es: "Cobre", en: "Copper" },
  fiber: { es: "Fibra óptica", en: "Fiber optics" },
  access: { es: "Acceso de banda ancha", en: "Broadband access" },
  power: { es: "Energía", en: "Power" },
  cabling: { es: "Cableado", en: "Cabling" },
  serial: { es: "Interfaces seriales", en: "Serial interfaces" },
};

export const STATUS_LABELS: Record<ProtocolStatus, L> = {
  current: { es: "Vigente", en: "Current" },
  legacy: { es: "Legado", en: "Legacy" },
  deprecated: { es: "Obsoleto / inseguro", en: "Deprecated / insecure" },
};

export const STATUS_DOT: Record<ProtocolStatus, string> = {
  current: "bg-emerald-500",
  legacy: "bg-amber-500",
  deprecated: "bg-rose-500",
};
