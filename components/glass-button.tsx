"use client";

import { forwardRef } from "react";
import { motion, type HTMLMotionProps } from "motion/react";
import { cn } from "@/lib/utils";
import { HOVER_SPRING } from "@/components/glass-card";

const SIZES = {
  sm: "h-8 px-4 text-[11px]",
  default: "h-10 px-5 text-sm",
} as const;

export interface GlassButtonProps extends HTMLMotionProps<"button"> {
  size?: keyof typeof SIZES;
}

/**
 * Botón con el mismo vidrio esmerilado del resto del sitio: reutiliza `.glass-card` tal
 * cual (mismo fondo, borde y filo que cualquier tarjeta o modal), sin teñirlo por instancia
 * — así se ve igual en todos lados, sin importar en qué sección o junto a qué capa aparezca.
 */
export const GlassButton = forwardRef<HTMLButtonElement, GlassButtonProps>(function GlassButton(
  { size = "default", className, children, type = "button", ...props },
  ref
) {
  return (
    <motion.button
      ref={ref}
      type={type}
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.96 }}
      transition={HOVER_SPRING}
      className={cn(
        "glass-card rounded-full inline-flex items-center justify-center gap-1.5 font-mono font-bold text-primary transition-shadow duration-300 hover:shadow-lg",
        SIZES[size],
        className
      )}
      {...props}
    >
      {children as React.ReactNode}
    </motion.button>
  );
});
