"use client";

import { useEffect, useId, useMemo, useState } from "react";
import { motion, AnimatePresence, type Variants } from "motion/react";
import {
  ChevronDown,
  FileCode,
  Cpu,
  Network,
  Radio,
  Layers,
  Shield,
  Globe,
  Lightbulb,
  Stethoscope,
} from "lucide-react";
import { OSILayer, TCPIPLayer, Language, DetailMode, TCPIP_TO_OSI } from "@/lib/network-data";
import { GlassCard, HOVER_SPRING } from "@/components/glass-card";
import { ProtocolCatalog } from "@/components/protocol-catalog";
import { useProtocolCatalog } from "@/hooks/use-protocol-catalog";

const OSI_ICONS = [Radio, Layers, Network, Cpu, Globe, Shield, FileCode];

type CardTab = "about" | "protocols" | "diagnose";

interface LayerCardProps {
  layer: OSILayer | TCPIPLayer;
  isOSI: boolean;
  index: number;
  isActive: boolean;
  onToggle: () => void;
  lang: Language;
  mode: DetailMode;
  /** La capa está conectada con la que tiene el puntero encima (resaltado cruzado). */
  isHighlighted?: boolean;
  /** Otra capa no relacionada está en hover: esta se atenúa. */
  isDimmed?: boolean;
  onHoverChange?: (hovering: boolean) => void;
  /** Protocolo a mostrar desde la búsqueda global. */
  focusProtocolId?: string | null;
  onFocusHandled?: () => void;
}

const colorStyles: Record<string, string> = {
  "#7c3aed": "border-violet-400/30 text-violet-600 dark:text-violet-400 bg-violet-500/5",
  "#6d28d9": "border-violet-500/30 text-violet-600 dark:text-violet-400 bg-violet-600/5",
  "#4f46e5": "border-indigo-400/30 text-indigo-600 dark:text-indigo-400 bg-indigo-500/5",
  "#2563eb": "border-blue-400/30 text-blue-600 dark:text-blue-400 bg-blue-500/5",
  "#0284c7": "border-sky-400/30 text-sky-600 dark:text-sky-400 bg-sky-500/5",
  "#0369a1": "border-cyan-400/30 text-cyan-600 dark:text-cyan-400 bg-cyan-500/5",
  "#075985": "border-slate-400/30 text-slate-600 dark:text-slate-400 bg-slate-500/5",
};

// Contenido expandido: cada bloque entra escalonado
const contentVariants: Variants = {
  open: { transition: { staggerChildren: 0.05, delayChildren: 0.06 } },
  closed: { transition: { staggerChildren: 0.03, staggerDirection: -1 } },
};
const blockVariants: Variants = {
  open: { opacity: 1, y: 0, filter: "blur(0px)", transition: { type: "spring", stiffness: 260, damping: 26 } },
  closed: { opacity: 0, y: 8, filter: "blur(4px)", transition: { duration: 0.15 } },
};

const labels = {
  es: {
    layer: "Capa", level: "Nivel",
    tabs: { about: "Descripción", protocols: "Protocolos", diagnose: "Diagnóstico" },
    inShort: "En pocas palabras", analogy: "Analogía", whatItDoes: "Qué hace exactamente",
    responsibilities: "Responsabilidades", header: "Qué añade al paquete", addressing: "Direccionamiento",
    provides: "Ofrece a la capa superior", uses: "Usa de la capa inferior", devices: "Dispositivos",
    concepts: "Conceptos clave", symptom: "Síntoma", cause: "Causa probable", loading: "Cargando catálogo…",
  },
  en: {
    layer: "Layer", level: "Level",
    tabs: { about: "Description", protocols: "Protocols", diagnose: "Troubleshooting" },
    inShort: "In a nutshell", analogy: "Analogy", whatItDoes: "What it does exactly",
    responsibilities: "Responsibilities", header: "What it adds to the packet", addressing: "Addressing",
    provides: "Provides to the layer above", uses: "Uses from the layer below", devices: "Devices",
    concepts: "Key concepts", symptom: "Symptom", cause: "Likely cause", loading: "Loading catalog…",
  },
};

function Label({ children }: { children: React.ReactNode }) {
  return <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground block mb-2">{children}</span>;
}

export function LayerCard({
  layer,
  isOSI,
  index,
  isActive,
  onToggle,
  lang,
  mode,
  isHighlighted = false,
  isDimmed = false,
  onHoverChange,
  focusProtocolId,
  onFocusHandled,
}: LayerCardProps) {
  const Icon = isOSI ? (OSI_ICONS[6 - index] || Network) : Network;
  const styleClass = colorStyles[layer.color] || "border-white/20";
  const t = labels[lang];
  const [tab, setTab] = useState<CardTab>("about");
  const pillId = useId();

  // El catálogo solo se descarga cuando se abre alguna tarjeta
  const catalog = useProtocolCatalog(isActive || !!focusProtocolId);
  // Memorizado: el catálogo usa la identidad del arreglo para programar la apertura desde Ctrl+K
  const protocols = useMemo(
    () => (catalog ? (isOSI ? catalog.protocolsForOsi(layer.number) : catalog.protocolsForTcpip(layer.number)) : []),
    [catalog, isOSI, layer.number]
  );
  const homeOsi = isOSI ? [layer.number] : TCPIP_TO_OSI[layer.number] ?? [];

  useEffect(() => {
    if (focusProtocolId) setTab("protocols");
  }, [focusProtocolId]);

  // El diagnóstico solo existe en modo técnico
  useEffect(() => {
    if (mode === "basic" && tab === "diagnose") setTab("about");
  }, [mode, tab]);

  const tabs: CardTab[] = mode === "technical" ? ["about", "protocols", "diagnose"] : ["about", "protocols"];

  return (
    <GlassCard
      glowColor={layer.color}
      onPointerEnter={() => onHoverChange?.(true)}
      onPointerLeave={() => onHoverChange?.(false)}
      animate={{ opacity: isDimmed ? 0.55 : 1, scale: isHighlighted ? 1.015 : 1 }}
      transition={HOVER_SPRING}
      style={{ ["--glow-color" as string]: layer.color }}
      className={`rounded-2xl overflow-hidden transition-shadow duration-500 ease-out-expo ${
        isActive ? "ring-2 ring-primary/40 shadow-2xl" : isHighlighted ? "ring-1 ring-primary/30 shadow-xl" : "hover:shadow-xl"
      }`}
    >
      <button
        onClick={onToggle}
        aria-expanded={isActive}
        className="relative z-10 w-full px-5 py-4 flex items-center justify-between text-left"
      >
        <div className="flex items-center gap-4">
          <motion.div
            whileHover={{ rotate: -8, scale: 1.08 }}
            transition={HOVER_SPRING}
            className={`w-10 h-10 rounded-xl flex items-center justify-center border ${styleClass}`}
          >
            <Icon className="w-5 h-5" />
          </motion.div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] uppercase tracking-widest opacity-60">
                {isOSI ? `${t.layer} ${layer.number}` : `${t.level} ${layer.number}`}
              </span>
              <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-primary/10 text-primary font-bold">
                {layer.pdu[lang]}
              </span>
            </div>
            <h3 className="font-bold text-base tracking-tight">{layer.name[lang]}</h3>
          </div>
        </div>
        <motion.span animate={{ rotate: isActive ? 180 : 0 }} transition={HOVER_SPRING} className="inline-flex">
          <ChevronDown className="w-5 h-5" />
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1, transition: { height: { type: "spring", stiffness: 220, damping: 30 }, opacity: { duration: 0.25 } } }}
            exit={{ height: 0, opacity: 0, transition: { height: { duration: 0.3, ease: [0.65, 0, 0.35, 1] }, opacity: { duration: 0.2 } } }}
            className="relative z-10 border-t border-white/20 dark:border-slate-800/50 overflow-hidden"
          >
            <div className="bg-white/20 dark:bg-slate-950/20">
              {/* Pestañas */}
              <div role="tablist" className="flex gap-1 px-4 pt-3">
                {tabs.map((id) => (
                  <button
                    key={id}
                    role="tab"
                    aria-selected={tab === id}
                    onClick={() => setTab(id)}
                    className={`relative text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors duration-300 ${
                      tab === id ? "text-primary" : "text-foreground/60 hover:text-foreground"
                    }`}
                  >
                    {tab === id && (
                      <motion.span layoutId={`card-tab-${pillId}`} transition={HOVER_SPRING} className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20" />
                    )}
                    <span className="relative">
                      {t.tabs[id]}
                      {id === "protocols" && catalog && <span className="ml-1 opacity-60">({protocols.length})</span>}
                    </span>
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${tab}-${mode}`}
                  variants={contentVariants}
                  initial="closed"
                  animate="open"
                  exit="closed"
                  className="p-5 space-y-5 text-xs leading-relaxed"
                >
                  {tab === "about" && mode === "basic" && (
                    <>
                      <motion.div variants={blockVariants}>
                        <Label>{t.inShort}</Label>
                        <p className="text-sm text-foreground/90 leading-relaxed">{layer.summary[lang]}</p>
                      </motion.div>
                      <motion.div variants={blockVariants} className="rounded-xl border border-primary/15 bg-primary/5 p-3">
                        <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1">
                          <Lightbulb className="w-3 h-3" /> {t.analogy}
                        </span>
                        <p className="text-foreground/85">{layer.analogy[lang]}</p>
                      </motion.div>
                      <motion.div variants={blockVariants}>
                        <Label>{t.responsibilities}</Label>
                        <ul className="space-y-1.5">
                          {layer.responsibilities.map((r, i) => (
                            <li key={i} className="group flex items-start gap-3 text-foreground/80 transition-colors duration-300 hover:text-foreground">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 transition-all duration-300 ease-out-expo group-hover:scale-150 group-hover:bg-primary" />
                              {r.title[lang]}
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.div variants={blockVariants}>
                        <Label>{t.devices}</Label>
                        <p className="text-foreground/80">{layer.devices[lang]}</p>
                      </motion.div>
                    </>
                  )}

                  {tab === "about" && mode === "technical" && (
                    <>
                      <motion.div variants={blockVariants}>
                        <Label>{t.whatItDoes}</Label>
                        <p className="text-foreground/85">{layer.overview[lang]}</p>
                        <p className="mt-2 text-[10px] font-mono opacity-50 italic">
                          Ref: {"standard" in layer ? layer.standard : layer.rfc}
                        </p>
                      </motion.div>
                      <motion.div variants={blockVariants}>
                        <Label>{t.responsibilities}</Label>
                        <ul className="space-y-3">
                          {layer.responsibilities.map((r, i) => (
                            <li key={i} className="group flex items-start gap-3">
                              <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary/40 flex-shrink-0 transition-all duration-300 ease-out-expo group-hover:scale-150 group-hover:bg-primary" />
                              <div>
                                <span className="font-semibold text-foreground">{r.title[lang]}</span>
                                <p className="text-foreground/75">{r.detail[lang]}</p>
                              </div>
                            </li>
                          ))}
                        </ul>
                      </motion.div>
                      <motion.dl variants={blockVariants} className="grid grid-cols-1 gap-2">
                        {[
                          [t.header, layer.header],
                          [t.addressing, layer.addressing],
                          [t.provides, layer.services.provides],
                          [t.uses, layer.services.uses],
                          [t.devices, layer.devices],
                        ].map(([label, value]) => (
                          <div
                            key={label as string}
                            className="rounded-lg border border-white/30 dark:border-slate-700/60 bg-white/30 dark:bg-slate-900/40 px-3 py-2 transition-colors duration-300 hover:border-primary/30"
                          >
                            <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{label as string}</dt>
                            <dd className="text-foreground/85">{(value as typeof layer.header)[lang]}</dd>
                          </div>
                        ))}
                      </motion.dl>
                      <motion.div variants={blockVariants}>
                        <Label>{t.concepts}</Label>
                        <div className="flex flex-wrap gap-2">
                          {layer.keywords.map((kw) => (
                            <span key={kw} className="text-[10px] font-mono px-2 py-0.5 bg-primary/5 text-primary rounded border border-primary/10 transition-all duration-300 ease-out-expo hover:-translate-y-0.5 hover:border-primary/40">
                              {kw}
                            </span>
                          ))}
                        </div>
                      </motion.div>
                    </>
                  )}

                  {tab === "protocols" && (
                    <motion.div variants={blockVariants}>
                      {catalog ? (
                        <ProtocolCatalog
                          protocols={protocols}
                          byId={catalog.PROTOCOLS_BY_ID}
                          homeOsi={homeOsi}
                          lang={lang}
                          mode={mode}
                          focusId={focusProtocolId}
                          onFocusHandled={onFocusHandled}
                        />
                      ) : (
                        <div className="space-y-2" aria-busy>
                          <span className="sr-only">{t.loading}</span>
                          {[0, 1, 2].map((i) => (
                            <div key={i} className="h-6 rounded-lg bg-primary/5 animate-pulse" style={{ width: `${80 - i * 20}%` }} />
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}

                  {tab === "diagnose" && (
                    <>
                      {layer.troubleshooting.map((item, i) => (
                        <motion.div
                          key={i}
                          variants={blockVariants}
                          className="rounded-xl border border-white/30 dark:border-slate-700/60 bg-white/30 dark:bg-slate-900/40 p-3 space-y-2 transition-colors duration-300 hover:border-primary/30"
                        >
                          <div className="flex items-start gap-2">
                            <Stethoscope className="w-3.5 h-3.5 mt-0.5 text-primary shrink-0" />
                            <span className="font-semibold text-foreground">{item.symptom[lang]}</span>
                          </div>
                          <p className="text-foreground/75">
                            <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">{t.cause}:</span>
                            {item.cause[lang]}
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {item.tools.map((tool) => (
                              <code key={tool} className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-900/90 text-slate-100">
                                {tool}
                              </code>
                            ))}
                          </div>
                        </motion.div>
                      ))}
                    </>
                  )}
                </motion.div>
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </GlassCard>
  );
}
