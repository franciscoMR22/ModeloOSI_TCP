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

  const renderLevel = (i: number): React.ReactNode => {
    const w = WRAPS[i];
    const color = LAYER_COLORS[w.osi];
    return (
      <motion.div
        layout
        key={w.label}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.05 }}
        transition={{ type: "spring", stiffness: 220, damping: 24 }}
        className="rounded-xl border p-1.5 flex items-stretch gap-1.5"
        style={{ borderColor: `${color}66`, background: `${color}14` }}
      >
        <span className="shrink-0 self-center text-[9px] font-mono font-bold px-1.5 py-1 rounded-md text-white whitespace-nowrap" style={{ background: color }}>
          {w.label}
        </span>
        {i === 0 ? (
          <span className="flex-1 min-w-0 self-center text-left text-[10px] font-mono opacity-70 px-1 truncate">GET /api/v1</span>
        ) : (
          <div className="flex-1 min-w-0">{renderLevel(i - 1)}</div>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-3">
      {/* Contenedor de altura reservada: el nivel más anidado (el más alto) fija el tamaño
          para que el crecimiento cíclico de la vista previa nunca reacomode el resto de la página. */}
      <div className="relative">
        <div className="invisible" aria-hidden>
          {renderLevel(WRAPS.length - 1)}
        </div>
        <div className="absolute inset-0 overflow-hidden">
          <AnimatePresence mode="popLayout">{renderLevel(shown)}</AnimatePresence>
        </div>
      </div>
      <div className="flex justify-center gap-1.5">
        {WRAPS.map((w, i) => (
          <motion.span
            key={w.label}
            animate={{ opacity: i <= shown ? 1 : 0.25, width: i === shown ? 18 : 6 }}
            transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="h-1.5 rounded-full"
            style={{ background: LAYER_COLORS[w.osi] }}
          />
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
