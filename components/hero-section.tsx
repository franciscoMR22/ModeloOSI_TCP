"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { Language } from "@/lib/network-data";
import { GlassCard } from "@/components/glass-card";
import { LiquidGlassButton } from "@/components/liquid-glass-button";
import { LAYER_COLORS } from "@/lib/encapsulation";

const heroContent = {
  es: {
    title: "Arquitectura de Redes",
    subtitle: "Explora la profundidad técnica de los modelos OSI e Internet (TCP/IP). Analiza el encapsulamiento de datos desde la aplicación hasta los bits.",
    encapTitle: "Encapsulamiento en acción",
    encapLabel: "Cada capa envuelve lo que recibe de la capa superior con su propia cabecera",
    cta: "Abrir el simulador",
  },
  en: {
    title: "Network Architecture",
    subtitle: "Explore the technical depth of OSI and Internet (TCP/IP) models. Analyze data encapsulation from application to bits.",
    encapTitle: "Encapsulation in action",
    encapLabel: "Each layer wraps what it receives from the layer above with its own header",
    cta: "Open the simulator",
  },
};

// De adentro hacia afuera: cada nivel envuelve al anterior
const WRAPS = [
  { osi: 7, label: "HTTP/2", pdu: "Data" },
  { osi: 6, label: "TLS", pdu: "Data" },
  { osi: 4, label: "TCP", pdu: "Segment" },
  { osi: 3, label: "IPv4", pdu: "Packet" },
  { osi: 2, label: "Ethernet", pdu: "Frame" },
];

// Geometría fija del riel: no cambia de tamaño nunca, así el recorrido del paquete
// no puede reacomodar el resto de la página (la causa del bug que ya corregimos antes).
const TRACK_H = 172;
const TRACK_PAD = 32;
const TRACK_X = 30;
const CORE_R = 5;
const RING_STEP = 6;
const ringRadius = (i: number) => 11 + (i - 1) * RING_STEP; // i = 1..WRAPS.length-1 → 11,17,23,29

function EncapsulationPreview() {
  const reduce = useReducedMotion();
  const [level, setLevel] = useState(reduce ? WRAPS.length - 1 : 0);

  useEffect(() => {
    if (reduce) return;
    const id = setInterval(() => setLevel((l) => (l + 1) % (WRAPS.length + 1)), 1300);
    return () => clearInterval(id);
  }, [reduce]);

  // level === WRAPS.length: pausa con todo armado antes de reiniciar
  const shown = Math.min(level, WRAPS.length - 1);

  // Posición vertical de cada parada del riel, de L7 (arriba) a L2 (abajo)
  const tickY = WRAPS.map((_, i) => TRACK_PAD + (i / (WRAPS.length - 1)) * (TRACK_H - 2 * TRACK_PAD));
  const springY = { type: "spring" as const, stiffness: 160, damping: 20 };

  return (
    <div className="flex gap-3" style={{ height: TRACK_H }}>
      {/* Riel: el paquete (punto central) baja de L7 a L2 y gana un anillo de color en cada parada */}
      <svg width={64} height={TRACK_H} className="shrink-0 overflow-visible" aria-hidden>
        <line x1={TRACK_X} y1={tickY[0]} x2={TRACK_X} y2={tickY[WRAPS.length - 1]} stroke="currentColor" strokeWidth={2} className="text-primary/15" />

        {/* Marcas fijas de cada capa: se rellenan al pasar el paquete por ahí */}
        {WRAPS.map((w, i) => (
          <motion.circle
            key={`tick-${w.label}`}
            cx={TRACK_X}
            cy={tickY[i]}
            r={3}
            strokeWidth={1.5}
            stroke={LAYER_COLORS[w.osi]}
            animate={{ fill: shown >= i ? LAYER_COLORS[w.osi] : "transparent" }}
            transition={{ duration: 0.3 }}
          />
        ))}

        {/* El paquete viajando: el centro es la carga (HTTP/2) y cada anillo es una capa ya atravesada */}
        <AnimatePresence>
          {Array.from({ length: shown + 1 }, (_, i) => i).map((i) => (
            <motion.circle
              key={`ring-${i}`}
              cx={TRACK_X}
              fill={i === 0 ? LAYER_COLORS[WRAPS[0].osi] : "none"}
              stroke={i === 0 ? "none" : LAYER_COLORS[WRAPS[i].osi]}
              strokeWidth={i === 0 ? 0 : 2.5}
              initial={{ cy: tickY[shown], r: 0, opacity: 0 }}
              animate={{ cy: tickY[shown], r: i === 0 ? CORE_R : ringRadius(i), opacity: 1 }}
              exit={{ r: 0, opacity: 0 }}
              transition={springY}
            />
          ))}
        </AnimatePresence>
      </svg>

      {/* Etiquetas de capa, alineadas con cada parada del riel */}
      <div className="relative flex-1" style={{ height: TRACK_H }}>
        {WRAPS.map((w, i) => (
          <motion.span
            key={w.label}
            animate={{ opacity: shown >= i ? 1 : 0.35 }}
            transition={{ duration: 0.3 }}
            className="absolute left-0 -translate-y-1/2 text-[9px] font-mono font-bold px-1.5 py-1 rounded-md text-white whitespace-nowrap"
            style={{ top: tickY[i], background: LAYER_COLORS[w.osi] }}
          >
            {w.label}
          </motion.span>
        ))}
      </div>
    </div>
  );
}

interface HeroSectionProps {
  lang: Language;
  /** Cambia a la sección del simulador (el menú ya no navega por anclas). */
  onOpenSimulator: () => void;
}

export function HeroSection({ lang, onOpenSimulator }: HeroSectionProps) {
  const t = heroContent[lang];

  return (
    <section className="relative pt-20 pb-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-3xl">
        <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
          {t.title}
        </h1>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
          {t.subtitle}
        </p>
      </motion.div>

      <GlassCard
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-lg p-6 rounded-3xl mb-12"
      >
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-primary mb-4 block">
          {t.encapTitle}
        </span>
        <EncapsulationPreview />
        <p className="text-[10px] font-mono mt-4 opacity-50 italic">{t.encapLabel}</p>
        <LiquidGlassButton onClick={onOpenSimulator} size="sm" className="mt-3">
          {t.cta} <ArrowRight className="w-3.5 h-3.5" />
        </LiquidGlassButton>
      </GlassCard>
    </section>
  );
}
