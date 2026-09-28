"use client";

import { forwardRef, useCallback, useRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";

// Resorte compartido para todas las interacciones de hover
export const HOVER_SPRING = { type: "spring", stiffness: 320, damping: 26, mass: 0.6 } as const;

interface GlassCardProps extends HTMLMotionProps<"div"> {
  /** Color del resplandor que sigue al puntero (cualquier color CSS). */
  glowColor?: string;
  /** Eleva la tarjeta al pasar el mouse. */
  lift?: boolean;
}

/**
 * Tarjeta de vidrio con un degradado radial que sigue al puntero.
 * La posición se escribe en variables CSS (--mx/--my) dentro de un requestAnimationFrame,
 * así el movimiento del mouse no provoca renders de React.
 */
export const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(function GlassCard(
  { glowColor, lift = true, className, style, onPointerMove, onPointerEnter, onPointerLeave, children, ...props },
  forwardedRef
) {
  const localRef = useRef<HTMLDivElement | null>(null);
  const frame = useRef<number | null>(null);

  const setRef = useCallback(
    (el: HTMLDivElement | null) => {
      localRef.current = el;
      if (typeof forwardedRef === "function") forwardedRef(el);
      else if (forwardedRef) forwardedRef.current = el;
    },
    [forwardedRef]
  );

  const updateGlow = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = localRef.current;
    if (!el || e.pointerType === "touch") return;
    const { clientX, clientY } = e;
    if (frame.current) cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${clientX - rect.left}px`);
      el.style.setProperty("--my", `${clientY - rect.top}px`);
    });
  };

  return (
    <motion.div
      ref={setRef}
      className={cn("glass-card glow-surface", className)}
      style={{ ...(glowColor ? { ["--glow-color" as string]: glowColor } : null), ...style }}
      whileHover={lift ? { y: -3, transition: HOVER_SPRING } : undefined}
      onPointerEnter={(e) => {
        if (e.pointerType !== "touch") localRef.current?.style.setProperty("--glow-opacity", "1");
        onPointerEnter?.(e);
      }}
      onPointerMove={(e) => {
        updateGlow(e);
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        localRef.current?.style.setProperty("--glow-opacity", "0");
        onPointerLeave?.(e);
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
});
