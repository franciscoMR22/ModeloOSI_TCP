"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import { Language } from "@/lib/network-data";
import type { SectionId } from "@/components/navbar";
import { TOUR_STEPS } from "@/lib/tour-steps";

const T = {
  es: { prev: "Anterior", next: "Siguiente", done: "Finalizar", skip: "Saltar", step: "Paso" },
  en: { prev: "Previous", next: "Next", done: "Done", skip: "Skip", step: "Step" },
};

const PAD = 10;
const TOOLTIP_W = 320;
// Resorte suave y ligero: el mismo tipo de movimiento que el resto del sitio usa para
// hover, pero algo menos rígido, porque aquí recorre distancias grandes (de un extremo
// de la pantalla a otro) y un resorte muy duro se vería como un salto, no como un deslizamiento.
const SPOTLIGHT_SPRING = { type: "spring", stiffness: 260, damping: 32, mass: 0.7 } as const;

function measure(selector: string | null): DOMRect | null {
  if (!selector || typeof document === "undefined") return null;
  const el = document.querySelector(`[data-tour="${selector}"]`);
  return el ? el.getBoundingClientRect() : null;
}

interface ProductTourProps {
  lang: Language;
  open: boolean;
  stepIndex: number;
  activeSection: SectionId;
  onNavigate: (id: SectionId) => void;
  onStepChange: (index: number) => void;
  onClose: () => void;
}

export function ProductTour({ lang, open, stepIndex, activeSection, onNavigate, onStepChange, onClose }: ProductTourProps) {
  const t = T[lang];
  const step = TOUR_STEPS[stepIndex];
  const [rect, setRect] = useState<DOMRect | null>(null);
  const [viewport, setViewport] = useState({ w: 0, h: 0 });
  const pendingNavRef = useRef(false);

  useEffect(() => {
    const update = () => setViewport({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  // Si el paso necesita otra sección, navega y espera a que el fundido de app/page.tsx
  // asiente antes de medir; si ya estamos donde debemos, solo una pausa breve para que
  // la tarjeta anterior termine de desvanecerse. Así nunca se mide un objetivo a medio transicionar.
  useEffect(() => {
    if (!open) return;
    setRect(null);

    if (step.section && step.section !== activeSection) {
      pendingNavRef.current = true;
      onNavigate(step.section);
      return;
    }

    const wasNavigating = pendingNavRef.current;
    pendingNavRef.current = false;
    const id = setTimeout(() => setRect(measure(step.target)), wasNavigating ? 650 : 70);
    return () => clearTimeout(id);
  }, [open, step, activeSection, onNavigate]);

  useEffect(() => {
    if (!open) return;
    const update = () => setRect(measure(step.target));
    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, [open, step]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft" && stepIndex > 0) onStepChange(stepIndex - 1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, stepIndex]);

  const isLast = stepIndex === TOUR_STEPS.length - 1;
  const goNext = () => (isLast ? onClose() : onStepChange(stepIndex + 1));

  if (!open) return null;

  const centerX = viewport.w / 2;
  const centerY = viewport.h / 2;
  const box = rect
    ? { top: rect.top - PAD, left: rect.left - PAD, width: rect.width + PAD * 2, height: rect.height + PAD * 2 }
    : { top: centerY, left: centerX, width: 0, height: 0 };

  // Posición del tooltip: debajo del objetivo si cabe, si no arriba; centrado si no hay objetivo.
  let tooltipStyle: React.CSSProperties;
  if (rect) {
    const spaceBelow = viewport.h - rect.bottom;
    const placeBelow = spaceBelow > 200 || spaceBelow > rect.top;
    const left = Math.min(Math.max(rect.left + rect.width / 2 - TOOLTIP_W / 2, 16), Math.max(viewport.w - TOOLTIP_W - 16, 16));
    tooltipStyle = placeBelow
      ? { top: rect.bottom + 20, left }
      : { bottom: viewport.h - rect.top + 20, left };
  } else {
    // Centrado en píxeles, no con `transform`: motion.div ya usa `transform` para animar su
    // propia entrada (y/filter), así que un transform de centrado puesto a mano aquí se
    // pierde (motion lo sobreescribe con el suyo) y el tooltip termina anclado por su esquina
    // en vez de centrado. Se estima el alto típico de estos pasos (cortos, sin objetivo).
    const estimatedHeight = 210;
    tooltipStyle = {
      top: Math.max(centerY - estimatedHeight / 2, 16),
      left: Math.min(Math.max(centerX - TOOLTIP_W / 2, 16), Math.max(viewport.w - TOOLTIP_W - 16, 16)),
    };
  }

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-0 z-[100]"
          role="dialog"
          aria-modal="true"
        >
          {/* Agujero de luz: una única caja que se desplaza entre objetivos con un resorte
              suave; su sombra gigante oscurece todo lo demás, así que también sirve de telón
              de fondo cuando se colapsa a un punto (pasos centrados o mientras navega). */}
          <motion.div
            className="fixed rounded-xl"
            style={{ boxShadow: "0 0 0 9999px rgba(8,8,9,0.7)" }}
            animate={box}
            transition={SPOTLIGHT_SPRING}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 8, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.28, ease: [0.16, 1, 0.3, 1] } }}
              exit={{ opacity: 0, y: -4, filter: "blur(3px)", transition: { duration: 0.14 } }}
              className="glass-card fixed rounded-2xl p-5 w-[min(320px,calc(100vw-2rem))] shadow-2xl"
              style={tooltipStyle}
            >
              <button
                onClick={onClose}
                aria-label={t.skip}
                className="absolute top-3 right-3 text-foreground/50 hover:text-foreground transition-colors"
              >
                <X className="w-4 h-4" />
              </button>

              <span className="font-mono text-[10px] uppercase tracking-widest text-primary/80">
                {t.step} {stepIndex + 1}/{TOUR_STEPS.length}
              </span>
              <h3 className="font-bold text-base mt-1 mb-2 pr-5">{step.title[lang]}</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">{step.body[lang]}</p>

              <div className="flex items-center gap-1.5 mt-4">
                {TOUR_STEPS.map((_, i) => (
                  <span
                    key={i}
                    className={`h-1.5 rounded-full transition-all duration-300 ${
                      i === stepIndex ? "w-4 bg-primary" : "w-1.5 bg-primary/25"
                    }`}
                  />
                ))}
              </div>

              <div className="flex items-center justify-between mt-4">
                <button
                  onClick={onClose}
                  className="text-xs font-mono text-foreground/60 hover:text-foreground transition-colors"
                >
                  {t.skip}
                </button>
                <div className="flex items-center gap-2">
                  {stepIndex > 0 && (
                    <button
                      onClick={() => onStepChange(stepIndex - 1)}
                      className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1.5 rounded-lg border border-primary/20 text-foreground/80 hover:bg-primary/5 transition-colors"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> {t.prev}
                    </button>
                  )}
                  <button
                    onClick={goNext}
                    className="inline-flex items-center gap-1 text-xs font-mono font-bold px-3 py-1.5 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                  >
                    {isLast ? t.done : t.next} {!isLast && <ArrowRight className="w-3.5 h-3.5" />}
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
