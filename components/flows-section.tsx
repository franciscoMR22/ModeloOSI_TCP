"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Handshake, Globe, Pause, Play, RefreshCw, SkipBack, SkipForward, Lock, ExternalLink } from "lucide-react";
import { GlassCard, HOVER_SPRING } from "@/components/glass-card";
import { SequenceDiagram } from "@/components/sequence-diagram";
import type { DetailMode, Language } from "@/lib/network-data";
import { HANDSHAKE_FLOWS, RTT_COMPARISON, URL_FLOW, type Flow } from "@/lib/flows";
import { LAYER_COLORS } from "@/lib/encapsulation";

const T = {
  es: {
    heading: "Flujos de comunicación",
    subheading: "Mensaje por mensaje, con el tiempo medido en viajes de ida y vuelta (RTT)",
    tabs: { handshakes: "Handshakes", url: "¿Qué pasa al escribir una URL?" },
    play: "Reproducir", pause: "Pausa", prev: "Anterior", next: "Siguiente", reset: "Reiniciar",
    step: "Mensaje", of: "de", layers: "Capas involucradas", open: "Ver ficha del protocolo",
    encrypted: "Cifrado",
    compare: "Tiempo hasta la primera respuesta", rtt: "Latencia (RTT)",
    compareNote: "Cada RTT es un viaje de ida y vuelta. Con 100 ms de latencia (un enlace intercontinental), ahorrar 2 RTT significa 200 ms menos antes de ver la página.",
  },
  en: {
    heading: "Communication flows",
    subheading: "Message by message, with time measured in round trips (RTT)",
    tabs: { handshakes: "Handshakes", url: "What happens when you type a URL?" },
    play: "Play", pause: "Pause", prev: "Previous", next: "Next", reset: "Reset",
    step: "Message", of: "of", layers: "Layers involved", open: "Open protocol sheet",
    encrypted: "Encrypted",
    compare: "Time to first response", rtt: "Latency (RTT)",
    compareNote: "Each RTT is one round trip. At 100 ms latency (an intercontinental link), saving 2 RTT means 200 ms less before the page shows up.",
  },
};

type Tab = "handshakes" | "url";

interface FlowsSectionProps {
  lang: Language;
  mode: DetailMode;
  /** Abre la ficha de un protocolo en su tarjeta de capa. */
  onOpenProtocol: (id: string, osi: number) => void;
}

export function FlowsSection({ lang, mode, onOpenProtocol }: FlowsSectionProps) {
  const t = T[lang];
  const [tab, setTab] = useState<Tab>("handshakes");
  const [flowId, setFlowId] = useState(HANDSHAKE_FLOWS[1].id);
  const flow: Flow = tab === "url" ? URL_FLOW : HANDSHAKE_FLOWS.find((f) => f.id === flowId) ?? HANDSHAKE_FLOWS[0];

  const [rawStep, setStep] = useState(0);
  const [playing, setPlaying] = useState(false);
  const last = flow.messages.length - 1;
  // Al cambiar a un flujo más corto, el índice puede quedar fuera de rango durante un render
  const step = Math.min(rawStep, last);
  const message = flow.messages[step];

  // Cambiar de flujo reinicia la reproducción
  useEffect(() => {
    setStep(0);
    setPlaying(false);
  }, [flow.id]);

  useEffect(() => {
    if (!playing) return;
    if (step >= last) {
      setPlaying(false);
      return;
    }
    const id = setTimeout(() => setStep((s) => s + 1), 2400);
    return () => clearTimeout(id);
  }, [playing, step, last]);

  return (
    <section className="px-4 sm:px-6 lg:px-8 py-20 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-10"
      >
        <h2 className="gradient-heading text-3xl md:text-4xl font-bold tracking-tight mb-3">{t.heading}</h2>
        <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">{t.subheading}</p>
      </motion.div>

      {/* Pestañas principales */}
      <div data-tour="flows-tabs" role="tablist" className="flex flex-wrap justify-center gap-2 mb-6">
        {(["handshakes", "url"] as Tab[]).map((id) => {
          const Icon = id === "handshakes" ? Handshake : Globe;
          return (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`relative flex items-center gap-2 text-xs font-medium px-4 py-2 rounded-xl transition-colors ${tab === id ? "text-primary" : "text-foreground/60 hover:text-foreground"}`}
            >
              {tab === id && <motion.span layoutId="flows-tab" transition={HOVER_SPRING} className="absolute inset-0 rounded-xl glass-card border-primary/30" />}
              <Icon className="relative w-4 h-4" />
              <span className="relative">{t.tabs[id]}</span>
            </button>
          );
        })}
      </div>

      <GlassCard lift={false} className="rounded-3xl p-4 sm:p-6">
        <div className="relative z-10 space-y-5">
          {/* Selector de handshake */}
          {tab === "handshakes" && (
            <div className="flex flex-wrap gap-1.5">
              {HANDSHAKE_FLOWS.map((f) => (
                <button
                  key={f.id}
                  onClick={() => setFlowId(f.id)}
                  className={`text-[11px] font-mono px-2.5 py-1 rounded-lg border transition-colors ${
                    flowId === f.id ? "border-primary/40 bg-primary/10 text-primary" : "border-white/40 dark:border-slate-700 hover:border-primary/30"
                  }`}
                >
                  {f.title[lang]}
                </button>
              ))}
            </div>
          )}

          <div>
            <h3 className="text-base font-bold">{flow.title[lang]}</h3>
            <p className="text-xs text-muted-foreground">{flow.description[lang]}</p>
          </div>

          {/* Controles */}
          <div className="flex flex-wrap items-center gap-2">
            <Ctrl onClick={() => setStep((s) => Math.max(0, s - 1))} disabled={step === 0} label={t.prev}><SkipBack className="w-3.5 h-3.5" /></Ctrl>
            <Ctrl
              primary
              label={playing ? t.pause : t.play}
              onClick={() => {
                if (step >= last) {
                  setStep(0);
                  setPlaying(true);
                } else setPlaying((p) => !p);
              }}
            >
              {playing ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{playing ? t.pause : t.play}</span>
            </Ctrl>
            <Ctrl onClick={() => setStep((s) => Math.min(last, s + 1))} disabled={step >= last} label={t.next}><SkipForward className="w-3.5 h-3.5" /></Ctrl>
            <Ctrl onClick={() => { setStep(0); setPlaying(false); }} label={t.reset}><RefreshCw className="w-3.5 h-3.5" /></Ctrl>
            <span className="ml-auto text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
              {t.step} {step + 1} {t.of} {flow.messages.length}
            </span>
          </div>

          <SequenceDiagram
            flow={flow}
            lang={lang}
            step={step}
            showTime={tab === "handshakes"}
            onSelect={(i) => {
              setPlaying(false);
              setStep(i);
            }}
          />

          {/* Detalle del mensaje actual */}
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={`${flow.id}-${step}-${lang}-${mode}`}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(4px)" }}
              transition={{ duration: 0.22 }}
              className="rounded-2xl border border-primary/20 bg-white/60 dark:bg-slate-900/60 p-4 space-y-3"
            >
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-sm font-bold">{message.label}</span>
                {message.encrypted && (
                  <span className="inline-flex items-center gap-1 text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
                    <Lock className="w-2.5 h-2.5" /> {t.encrypted}
                  </span>
                )}
                {message.t !== undefined && <span className="text-[10px] font-mono text-muted-foreground">t = {message.t} RTT</span>}
              </div>
              <p className="text-xs leading-relaxed text-foreground/85">{mode === "technical" ? message.technical[lang] : message.basic[lang]}</p>
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-1" aria-label={t.layers}>
                  <span className="text-[10px] uppercase tracking-wider text-muted-foreground mr-1">{t.layers}</span>
                  {[7, 6, 5, 4, 3, 2, 1].map((n) => {
                    const on = message.osi.includes(n);
                    return (
                      <motion.span
                        key={n}
                        animate={{ opacity: on ? 1 : 0.25, scale: on ? 1 : 0.9 }}
                        transition={HOVER_SPRING}
                        className="text-[9px] font-mono font-bold w-6 text-center py-0.5 rounded"
                        style={{ background: on ? LAYER_COLORS[n] : "transparent", color: on ? "white" : undefined, border: on ? "none" : "1px solid currentColor" }}
                      >
                        L{n}
                      </motion.span>
                    );
                  })}
                </div>
                {message.protocolId && (
                  <button
                    onClick={() => onOpenProtocol(message.protocolId!, message.osi[0])}
                    className="inline-flex items-center gap-1 text-[11px] font-mono text-primary hover:opacity-70 transition-opacity"
                  >
                    {t.open} <ExternalLink className="w-3 h-3" />
                  </button>
                )}
              </div>
            </motion.div>
          </AnimatePresence>

          {step >= last && (
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              {flow.summary[lang]}
            </motion.p>
          )}

          {tab === "handshakes" && <RttComparison lang={lang} highlight={flow.id} />}
        </div>
      </GlassCard>
    </section>
  );
}

function Ctrl({ children, onClick, disabled, primary, label }: { children: React.ReactNode; onClick: () => void; disabled?: boolean; primary?: boolean; label: string }) {
  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      aria-label={label}
      title={label}
      whileHover={disabled ? undefined : { scale: 1.05 }}
      whileTap={disabled ? undefined : { scale: 0.95 }}
      transition={HOVER_SPRING}
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
        primary ? "bg-primary text-primary-foreground hover:bg-primary/90" : "bg-white/60 dark:bg-slate-800/80 border border-white/40 dark:border-slate-700 hover:border-primary/40"
      }`}
    >
      {children}
    </motion.button>
  );
}

function RttComparison({ lang, highlight }: { lang: Language; highlight: string }) {
  const t = T[lang];
  const [rtt, setRtt] = useState(50);
  const max = Math.max(...RTT_COMPARISON.map((c) => c.rtt));

  return (
    <div className="rounded-2xl border border-white/30 dark:border-slate-700/60 bg-white/40 dark:bg-slate-900/40 p-4 space-y-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">{t.compare}</span>
        <label className="flex items-center gap-2 text-[11px] font-mono">
          {t.rtt}
          <input type="range" min={10} max={300} step={5} value={rtt} onChange={(e) => setRtt(Number(e.target.value))} className="w-32 accent-[var(--primary)]" />
          <span className="text-primary w-14">{rtt} ms</span>
        </label>
      </div>
      <div className="space-y-1.5">
        {RTT_COMPARISON.map((c) => {
          const active = c.id === highlight;
          return (
            <div key={c.id} className="grid grid-cols-[9.5rem_1fr_4.5rem] items-center gap-2">
              <span className={`text-[11px] font-mono truncate ${active ? "text-primary font-bold" : ""}`}>{c.label}</span>
              <div className="h-5 rounded-md bg-primary/5 overflow-hidden" title={c.note[lang]}>
                <motion.div
                  className="h-full rounded-md flex items-center px-2 text-[9px] font-mono text-white whitespace-nowrap"
                  animate={{ width: `${(c.rtt / max) * 100}%`, opacity: active ? 1 : 0.6 }}
                  transition={{ type: "spring", stiffness: 140, damping: 22 }}
                  style={{ background: "linear-gradient(90deg, #9C5237, #D8CEBE, #154B34)" }}
                >
                  {c.rtt} RTT
                </motion.div>
              </div>
              <span className={`text-[11px] font-mono text-right ${active ? "text-primary font-bold" : "text-muted-foreground"}`}>{c.rtt * rtt} ms</span>
            </div>
          );
        })}
      </div>
      <p className="text-[11px] text-muted-foreground">{t.compareNote}</p>
    </div>
  );
}
