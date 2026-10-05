"use client";

import { motion } from "motion/react";
import { ExternalLink, BookOpen, Wrench, Truck } from "lucide-react";
import { GlassCard } from "@/components/glass-card";
import { GlassButton } from "@/components/glass-button";
import { OSI_LAYERS, type DetailMode, type Language } from "@/lib/network-data";
import { MISFITS, type Misfit } from "@/lib/misfits";
import { LAYER_COLORS } from "@/lib/encapsulation";

const T = {
  es: {
    heading: "Donde el modelo no encaja",
    subheading: "El modelo OSI es una referencia, no una ley: estos protocolos lo desbordan",
    textbook: "Libro de texto",
    actual: "En la práctica",
    carrier: "Viaja sobre",
    open: "Ver ficha",
    intro:
      "Las capas son una herramienta para razonar, no una clasificación exacta. Los protocolos reales se diseñaron por necesidad y a veces cumplen funciones de varias capas o viajan sobre una capa «equivocada». Entender estas excepciones es lo que separa memorizar el modelo de comprenderlo.",
  },
  en: {
    heading: "Where the model doesn't fit",
    subheading: "OSI is a reference, not a law: these protocols spill over it",
    textbook: "Textbook",
    actual: "In practice",
    carrier: "Rides on",
    open: "Open sheet",
    intro:
      "Layers are a tool for reasoning, not an exact taxonomy. Real protocols were designed out of necessity and sometimes perform functions of several layers or ride on the “wrong” one. Understanding these exceptions is what separates memorising the model from understanding it.",
  },
};

interface MisfitsSectionProps {
  lang: Language;
  mode: DetailMode;
  onOpenProtocol: (id: string, osi: number) => void;
}

export function MisfitsSection({ lang, mode, onOpenProtocol }: MisfitsSectionProps) {
  const t = T[lang];
  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-7xl mx-auto">
      <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-6">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.heading}</h2>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{t.subheading}</p>
      </motion.div>
      <p className="max-w-3xl mx-auto text-center text-sm text-muted-foreground mb-10">{t.intro}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {MISFITS.map((m, i) => (
          <motion.div
            key={m.protocolId}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ type: "spring", stiffness: 200, damping: 24, delay: (i % 4) * 0.06 }}
          >
            <MisfitCard misfit={m} lang={lang} mode={mode} onOpen={() => onOpenProtocol(m.protocolId, m.spans[0])} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function MisfitCard({ misfit: m, lang, mode, onOpen }: { misfit: Misfit; lang: Language; mode: DetailMode; onOpen: () => void }) {
  const t = T[lang];
  const color = LAYER_COLORS[m.spans[0]];

  return (
    <GlassCard glowColor={color} className="rounded-2xl p-4 h-full">
      <div className="relative z-10 flex gap-4 h-full">
        {/* Mini pila: el anillo marca la ubicación "de libro"; las barras, lo que realmente hace */}
        <div className="shrink-0 flex flex-col gap-1" aria-hidden>
          {OSI_LAYERS.map((layer) => {
            const active = m.spans.includes(layer.number);
            const isTextbook = m.textbook === layer.number;
            return (
              <div key={layer.number} className="flex items-center gap-1.5">
                <span className="w-3 flex justify-center">
                  {isTextbook && <span className="w-2.5 h-2.5 rounded-full border-2" style={{ borderColor: LAYER_COLORS[layer.number] }} />}
                </span>
                <motion.div
                  className="h-4 w-10 rounded text-[8px] font-mono font-bold flex items-center justify-center"
                  initial={false}
                  whileInView={{ opacity: active ? 1 : 0.3 }}
                  style={{
                    background: active ? LAYER_COLORS[layer.number] : "transparent",
                    color: active ? "white" : undefined,
                    border: active ? "none" : "1px dashed color-mix(in oklch, currentColor 35%, transparent)",
                  }}
                >
                  L{layer.number}
                </motion.div>
              </div>
            );
          })}
        </div>

        <div className="flex-1 min-w-0 flex flex-col">
          <h3 className="text-lg font-bold tracking-tight">{m.acronym}</h3>
          <div className="flex flex-wrap gap-x-3 gap-y-1 mb-2 text-[10px] font-mono text-muted-foreground">
            <span className="inline-flex items-center gap-1"><BookOpen className="w-3 h-3" /> {t.textbook}: L{m.textbook}</span>
            <span className="inline-flex items-center gap-1"><Wrench className="w-3 h-3" /> {t.actual}: {m.spans.map((n) => `L${n}`).join(" + ")}</span>
          </div>
          <p className="text-xs text-foreground/85 leading-relaxed flex-1">{mode === "technical" ? m.technical[lang] : m.basic[lang]}</p>
          <div className="mt-3 space-y-2">
            <span className="flex items-start gap-1.5 text-[10px] font-mono text-emerald-700 dark:text-emerald-300">
              <Truck className="w-3 h-3 mt-px shrink-0" /> {t.carrier}: {m.carrier[lang]}
            </span>
            <GlassButton onClick={onOpen} glowColor={color} size="sm" className="text-primary">
              {t.open} <ExternalLink className="w-3 h-3" />
            </GlassButton>
          </div>
        </div>
      </div>
    </GlassCard>
  );
}
