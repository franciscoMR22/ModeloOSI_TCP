"use client";

import { useEffect, useId, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import {
  ArrowLeft,
  BookOpen,
  Check,
  Copy,
  ExternalLink,
  Lightbulb,
  Shield,
  Split,
  Terminal,
  Users,
  X,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { HOVER_SPRING } from "@/components/glass-card";
import type { DetailMode, Language } from "@/lib/network-data";
import type { Protocol } from "@/lib/protocols/types";
import { STATUS_DOT, STATUS_LABELS } from "@/lib/protocols/labels";
import { HEADERS, HEADER_BY_PROTOCOL } from "@/lib/headers";
import { HeaderDiagram } from "@/components/header-diagram";
import { LAYER_COLORS } from "@/lib/encapsulation";

type TabId = "overview" | "technical" | "header" | "practice" | "refs";

const T = {
  es: {
    tabs: { overview: "Resumen", technical: "Técnico", header: "Cabecera", practice: "Seguridad y práctica", refs: "Referencias" },
    analogy: "Analogía",
    everyday: "¿Dónde lo usas?",
    multiLayer: "¿Por qué es multicapa?",
    howItWorks: "Cómo funciona",
    facts: "Ficha técnica",
    security: "Seguridad",
    tools: "Comandos útiles",
    wireshark: "Filtro de Wireshark",
    relations: { dependsOn: "Depende de", usedBy: "Lo usan", replaces: "Reemplaza a", replacedBy: "Reemplazado por" },
    specs: "Especificaciones",
    back: "Volver",
    close: "Cerrar",
    copy: "Copiar",
    layers: "Capas OSI",
    noPractice: "Sin notas de seguridad ni comandos específicos para este estándar.",
  },
  en: {
    tabs: { overview: "Overview", technical: "Technical", header: "Header", practice: "Security & practice", refs: "References" },
    analogy: "Analogy",
    everyday: "Where do you use it?",
    multiLayer: "Why is it multi-layer?",
    howItWorks: "How it works",
    facts: "Fact sheet",
    security: "Security",
    tools: "Useful commands",
    wireshark: "Wireshark filter",
    relations: { dependsOn: "Depends on", usedBy: "Used by", replaces: "Replaces", replacedBy: "Replaced by" },
    specs: "Specifications",
    back: "Back",
    close: "Close",
    copy: "Copy",
    layers: "OSI layers",
    noPractice: "No specific security notes or commands for this standard.",
  },
};

interface ProtocolPopoverProps {
  protocol: Protocol;
  byId: Record<string, Protocol>;
  lang: Language;
  mode: DetailMode;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}

export function ProtocolPopover({ protocol, byId, lang, mode, open, onOpenChange, children }: ProtocolPopoverProps) {
  // Historial interno: navegar a un protocolo relacionado no cambia el ancla del popover
  const [history, setHistory] = useState<string[]>([protocol.id]);
  const current = byId[history[history.length - 1]] ?? protocol;
  const t = T[lang];

  useEffect(() => {
    if (open) setHistory([protocol.id]);
  }, [open, protocol.id]);

  const navigate = (id: string) => byId[id] && setHistory((h) => [...h, id]);
  const back = () => setHistory((h) => (h.length > 1 ? h.slice(0, -1) : h));

  return (
    <Popover open={open} onOpenChange={onOpenChange}>
      <PopoverTrigger asChild>{children}</PopoverTrigger>
      <PopoverContent
        side="bottom"
        align="start"
        sideOffset={8}
        collisionPadding={16}
        className="glass-card w-[min(94vw,34rem)] p-0 rounded-2xl border-white/30 dark:border-white/10 bg-[color-mix(in_oklch,var(--popover)_82%,transparent)] backdrop-blur-2xl shadow-2xl"
        style={{ ["--glow-color" as string]: protocolColor(current) }}
      >
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={current.id}
            initial={{ opacity: 0, x: 12, filter: "blur(4px)" }}
            animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, x: -12, filter: "blur(4px)" }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
          >
            <ProtocolDetail
              protocol={current}
              byId={byId}
              lang={lang}
              mode={mode}
              initialTab={mode === "technical" ? "technical" : "overview"}
              canGoBack={history.length > 1}
              onBack={back}
              onNavigate={navigate}
              onClose={() => onOpenChange(false)}
            />
          </motion.div>
        </AnimatePresence>
      </PopoverContent>
    </Popover>
  );
}

// Color de acento según la capa principal (misma paleta que las tarjetas; LAYER_COLORS es la fuente única en lib/encapsulation.ts)
export const protocolColor = (p: Protocol) => LAYER_COLORS[p.osi[0]] ?? "#6E9142";

interface DetailProps {
  protocol: Protocol;
  byId: Record<string, Protocol>;
  lang: Language;
  mode: DetailMode;
  initialTab: TabId;
  canGoBack: boolean;
  onBack: () => void;
  onNavigate: (id: string) => void;
  onClose: () => void;
}

function ProtocolDetail({ protocol: p, byId, lang, mode, initialTab, canGoBack, onBack, onNavigate, onClose }: DetailProps) {
  const [tab, setTab] = useState<TabId>(initialTab);
  const pillId = useId();
  const t = T[lang];
  const headerId = HEADER_BY_PROTOCOL[p.id];
  const tabs: TabId[] = headerId ? ["overview", "technical", "header", "practice", "refs"] : ["overview", "technical", "practice", "refs"];

  return (
    <div className="flex flex-col max-h-[min(72vh,38rem)]">
      {/* Cabecera fija */}
      <div className="px-5 pt-4 pb-3 border-b border-white/20 dark:border-white/10">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <div className="flex items-center gap-2 mb-1">
              {canGoBack && (
                <button onClick={onBack} className="inline-flex items-center gap-1 text-[10px] font-mono uppercase tracking-widest text-primary hover:opacity-70 transition-opacity">
                  <ArrowLeft className="w-3 h-3" /> {t.back}
                </button>
              )}
              <span className="inline-flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-muted-foreground">
                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[p.status]}`} />
                {STATUS_LABELS[p.status][lang]}
              </span>
            </div>
            <h4 className="text-xl font-bold tracking-tight leading-tight">{p.acronym}</h4>
            <p className="text-xs text-muted-foreground leading-snug">{p.fullName[lang]}</p>
          </div>
          <button onClick={onClose} aria-label={t.close} className="shrink-0 rounded-lg p-1.5 hover:bg-primary/10 transition-colors">
            <X className="w-4 h-4" />
          </button>
        </div>

        <div className="mt-3 flex flex-wrap gap-1.5">
          {p.osi.map((n) => (
            <span key={n} className="text-[10px] font-mono font-bold px-1.5 py-0.5 rounded-md bg-primary/10 text-primary border border-primary/20">
              L{n}
            </span>
          ))}
          {p.bodies.map((b) => (
            <span key={b} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/70 border border-white/40 dark:border-slate-700">
              {b}
            </span>
          ))}
          <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-white/50 dark:bg-slate-800/70 border border-white/40 dark:border-slate-700">
            {p.year}
          </span>
          {p.identifiers?.map((id) => (
            <span key={id} className="text-[10px] font-mono px-1.5 py-0.5 rounded-md bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border border-emerald-500/20">
              {id}
            </span>
          ))}
        </div>

        {/* Pestañas */}
        <div role="tablist" className="mt-3 flex gap-1 overflow-x-auto -mx-1 px-1">
          {tabs.map((id) => (
            <button
              key={id}
              role="tab"
              aria-selected={tab === id}
              onClick={() => setTab(id)}
              className={`relative shrink-0 text-[11px] font-medium px-2.5 py-1.5 rounded-lg transition-colors duration-300 ${
                tab === id ? "text-primary" : "text-foreground/60 hover:text-foreground"
              }`}
            >
              {tab === id && (
                <motion.span layoutId={`tab-pill-${pillId}`} transition={HOVER_SPRING} className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20" />
              )}
              <span className="relative">{t.tabs[id]}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Cuerpo desplazable */}
      <div className="overflow-y-auto overscroll-contain px-5 py-4">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.18 }}
            className="space-y-4 text-[13px] leading-relaxed"
          >
            {tab === "overview" && <OverviewTab p={p} lang={lang} />}
            {tab === "technical" && <TechnicalTab p={p} lang={lang} />}
            {tab === "header" && headerId && <HeaderDiagram spec={HEADERS[headerId]} lang={lang} mode={mode} color={protocolColor(p)} />}
            {tab === "practice" && <PracticeTab p={p} lang={lang} />}
            {tab === "refs" && <RefsTab p={p} lang={lang} byId={byId} onNavigate={onNavigate} />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

function SectionTitle({ icon: Icon, children }: { icon?: React.ComponentType<{ className?: string }>; children: React.ReactNode }) {
  return (
    <span className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-widest text-muted-foreground mb-1.5">
      {Icon && <Icon className="w-3 h-3" />}
      {children}
    </span>
  );
}

function Callout({ tone, icon: Icon, title, children }: { tone: "primary" | "amber" | "rose"; icon: React.ComponentType<{ className?: string }>; title: string; children: React.ReactNode }) {
  const tones = {
    primary: "bg-primary/5 border-primary/15",
    amber: "bg-amber-500/10 border-amber-500/20",
    rose: "bg-rose-500/10 border-rose-500/20",
  };
  return (
    <div className={`rounded-xl border p-3 ${tones[tone]}`}>
      <SectionTitle icon={Icon}>{title}</SectionTitle>
      <div className="text-foreground/85">{children}</div>
    </div>
  );
}

function OverviewTab({ p, lang }: { p: Protocol; lang: Language }) {
  const t = T[lang];
  return (
    <>
      <p className="text-foreground/90">{p.summary[lang]}</p>
      {p.analogy && <Callout tone="primary" icon={Lightbulb} title={t.analogy}>{p.analogy[lang]}</Callout>}
      {p.everyday && (
        <div>
          <SectionTitle icon={Users}>{t.everyday}</SectionTitle>
          <p className="text-foreground/80">{p.everyday[lang]}</p>
        </div>
      )}
      {p.multiLayerNote && <Callout tone="amber" icon={Split} title={t.multiLayer}>{p.multiLayerNote[lang]}</Callout>}
    </>
  );
}

function TechnicalTab({ p, lang }: { p: Protocol; lang: Language }) {
  const t = T[lang];
  return (
    <>
      {p.technical.map((para, i) => (
        <p key={i} className="text-foreground/85">{para[lang]}</p>
      ))}

      {p.howItWorks && p.howItWorks.length > 0 && (
        <div>
          <SectionTitle>{t.howItWorks}</SectionTitle>
          <ol className="space-y-2">
            {p.howItWorks.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="mt-0.5 shrink-0 w-5 h-5 rounded-full bg-primary/15 text-primary text-[10px] font-bold flex items-center justify-center">{i + 1}</span>
                <span className="text-foreground/85">{step[lang]}</span>
              </li>
            ))}
          </ol>
        </div>
      )}

      {p.facts.length > 0 && (
        <div>
          <SectionTitle>{t.facts}</SectionTitle>
          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {p.facts.map((f, i) => (
              <div key={i} className="rounded-lg border border-white/30 dark:border-slate-700/60 bg-white/30 dark:bg-slate-900/40 px-3 py-2">
                <dt className="text-[10px] uppercase tracking-wider text-muted-foreground">{f.label[lang]}</dt>
                <dd className="text-xs font-medium">{typeof f.value === "string" ? f.value : f.value[lang]}</dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </>
  );
}

function CopyableCommand({ command, description, lang }: { command: string; description?: string; lang: Language }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {
      /* el portapapeles puede no estar disponible (http, permisos) */
    }
  };
  return (
    <div className="group rounded-lg border border-slate-700/60 bg-slate-900/90 text-slate-100 px-3 py-2">
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-[11px] break-all">{command}</code>
        <button onClick={copy} aria-label={T[lang].copy} className="shrink-0 opacity-60 group-hover:opacity-100 transition-opacity">
          {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
        </button>
      </div>
      {description && <p className="mt-1 text-[11px] text-slate-400">{description}</p>}
    </div>
  );
}

function PracticeTab({ p, lang }: { p: Protocol; lang: Language }) {
  const t = T[lang];
  const empty = !p.security && !p.tools?.length && !p.wireshark;
  return (
    <>
      {p.security && (
        <Callout tone={p.status === "deprecated" ? "rose" : "amber"} icon={Shield} title={t.security}>
          {p.security[lang]}
        </Callout>
      )}
      {p.tools && p.tools.length > 0 && (
        <div>
          <SectionTitle icon={Terminal}>{t.tools}</SectionTitle>
          <div className="space-y-2">
            {p.tools.map((tool) => (
              <CopyableCommand key={tool.command} command={tool.command} description={tool.description[lang]} lang={lang} />
            ))}
          </div>
        </div>
      )}
      {p.wireshark && (
        <div>
          <SectionTitle>{t.wireshark}</SectionTitle>
          <CopyableCommand command={p.wireshark} lang={lang} />
        </div>
      )}
      {empty && <p className="text-muted-foreground italic">{t.noPractice}</p>}
    </>
  );
}

function RefsTab({ p, lang, byId, onNavigate }: { p: Protocol; lang: Language; byId: Record<string, Protocol>; onNavigate: (id: string) => void }) {
  const t = T[lang];
  const groups = (Object.keys(t.relations) as (keyof typeof t.relations)[])
    .map((key) => ({ key, ids: (p.relations?.[key] ?? []).filter((id) => byId[id]) }))
    .filter((g) => g.ids.length > 0);

  return (
    <>
      {groups.map((g) => (
        <div key={g.key}>
          <SectionTitle>{t.relations[g.key]}</SectionTitle>
          <div className="flex flex-wrap gap-1.5">
            {g.ids.map((id) => (
              <motion.button
                key={id}
                onClick={() => onNavigate(id)}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                transition={HOVER_SPRING}
                className="text-[11px] font-mono px-2 py-1 rounded-lg bg-primary/5 text-primary border border-primary/15 hover:border-primary/40 hover:bg-primary/10 transition-colors"
              >
                {byId[id].acronym}
              </motion.button>
            ))}
          </div>
        </div>
      ))}

      <div>
        <SectionTitle icon={BookOpen}>{t.specs}</SectionTitle>
        <ul className="space-y-1.5">
          {p.specs.map((s) => (
            <li key={s.id} className="flex items-start gap-2">
              <span className="shrink-0 font-mono text-[11px] font-bold text-primary min-w-[5.5rem]">{s.id}</span>
              {s.url ? (
                <a href={s.url} target="_blank" rel="noreferrer" className="text-xs text-foreground/80 hover:text-primary inline-flex items-start gap-1 transition-colors">
                  {s.title[lang]} <ExternalLink className="w-3 h-3 mt-0.5 shrink-0" />
                </a>
              ) : (
                <span className="text-xs text-foreground/80">{s.title[lang]}</span>
              )}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
