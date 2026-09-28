"use client";

import { useEffect, useState } from "react";
import { motion, useScroll, useSpring, useTransform, useMotionTemplate } from "motion/react";
import { Network, Moon, Sun, Languages, Check, Search, GraduationCap, Cpu } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";
import { Language, DetailMode } from "@/lib/network-data";
import { HOVER_SPRING } from "@/components/glass-card";

const languages: { name: string; code: Language }[] = [
  { name: "Español", code: "es" },
  { name: "English", code: "en" },
];

const navLabels = {
  es: { hero: "Inicio", layers: "Capas", trace: "Simulador", flows: "Flujos" },
  en: { hero: "Home", layers: "Layers", trace: "Simulator", flows: "Flows" },
};

const modeLabels = {
  es: { basic: "Básico", technical: "Técnico", search: "Buscar protocolo" },
  en: { basic: "Basic", technical: "Technical", search: "Search protocol" },
};

type SectionId = keyof (typeof navLabels)["es"];
const SECTION_IDS = Object.keys(navLabels.es) as SectionId[];

// Distancia de scroll (px) en la que la barra pasa de "flotante" a "compacta"
const SCROLL_RANGE = [0, 140];

interface NavbarProps {
  onLanguageChange: (lang: Language) => void;
  currentLang: Language;
  mode: DetailMode;
  onModeChange: (mode: DetailMode) => void;
  onSearch: () => void;
}

function useActiveSection() {
  const [active, setActive] = useState<SectionId>("hero");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActive(visible[0].target.id as SectionId);
      },
      // Franja central de la ventana: la sección que la cruza es la activa
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.25, 0.5, 1] }
    );
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return active;
}

export function Navbar({ onLanguageChange, currentLang, mode, onModeChange, onSearch }: NavbarProps) {
  const ml = modeLabels[currentLang];
  const { resolvedTheme, setTheme } = useTheme();
  const active = useActiveSection();
  const { scrollY, scrollYProgress } = useScroll();

  // Un resorte sobre el scroll hace que todos los valores derivados cambien de forma continua y suave
  const smoothY = useSpring(scrollY, { stiffness: 180, damping: 30, mass: 0.4 });
  const blur = useTransform(smoothY, SCROLL_RANGE, [10, 22]);
  const bgAlpha = useTransform(smoothY, SCROLL_RANGE, [35, 78]);
  const borderAlpha = useTransform(smoothY, SCROLL_RANGE, [30, 55]);
  const shadowAlpha = useTransform(smoothY, SCROLL_RANGE, [0, 0.14]);
  const paddingY = useTransform(smoothY, SCROLL_RANGE, [12, 8]);
  const maxWidth = useTransform(smoothY, SCROLL_RANGE, [1280, 1040]);

  const backdropFilter = useMotionTemplate`blur(${blur}px) saturate(160%)`;
  const background = useMotionTemplate`color-mix(in oklch, var(--background) ${bgAlpha}%, transparent)`;
  const borderColor = useMotionTemplate`color-mix(in oklch, var(--glass-border) ${borderAlpha}%, transparent)`;
  const boxShadow = useMotionTemplate`0 10px 40px -10px rgba(15, 23, 42, ${shadowAlpha})`;

  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      style={{ paddingTop: paddingY, paddingBottom: paddingY }}
      className="fixed top-0 left-0 right-0 z-50 px-4"
    >
      <motion.div
        style={{ maxWidth, backdropFilter, WebkitBackdropFilter: backdropFilter, background, borderColor, boxShadow }}
        className="relative mx-auto rounded-2xl border px-4 py-2 flex items-center justify-between overflow-hidden"
      >
        <a href="#hero" className="flex items-center gap-2 group">
          <motion.span whileHover={{ rotate: 90 }} transition={HOVER_SPRING} className="inline-flex">
            <Network className="w-5 h-5 text-primary" />
          </motion.span>
          <span className="font-bold text-sm">NetStack</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {SECTION_IDS.map((key) => {
            const isActive = active === key;
            return (
              <a
                key={key}
                href={`#${key}`}
                className={`relative text-xs font-mono px-3 py-1.5 rounded-lg transition-colors duration-300 ${
                  isActive ? "text-primary" : "text-foreground/70 hover:text-foreground"
                }`}
              >
                {isActive && (
                  <motion.span
                    layoutId="nav-active-pill"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    className="absolute inset-0 rounded-lg bg-primary/10 border border-primary/20"
                  />
                )}
                <span className="relative">{navLabels[currentLang][key]}</span>
              </a>
            );
          })}
        </nav>

        <div className="flex items-center gap-1.5">
          {/* Nivel de explicación */}
          <div role="radiogroup" className="hidden sm:flex items-center rounded-lg border border-primary/15 bg-primary/5 p-0.5">
            {(["basic", "technical"] as DetailMode[]).map((m) => {
              const ModeIcon = m === "basic" ? GraduationCap : Cpu;
              return (
                <button
                  key={m}
                  role="radio"
                  aria-checked={mode === m}
                  onClick={() => onModeChange(m)}
                  className={`relative flex items-center gap-1 text-[11px] font-medium px-2 py-1 rounded-md transition-colors duration-300 ${
                    mode === m ? "text-primary" : "text-foreground/60 hover:text-foreground"
                  }`}
                >
                  {mode === m && (
                    <motion.span layoutId="mode-pill" transition={HOVER_SPRING} className="absolute inset-0 rounded-md bg-background/80 shadow-sm border border-primary/20" />
                  )}
                  <ModeIcon className="relative w-3.5 h-3.5" />
                  <span className="relative">{ml[m]}</span>
                </button>
              );
            })}
          </div>

          <Button variant="ghost" size="sm" onClick={onSearch} aria-label={ml.search} className="gap-1.5 px-2">
            <Search className="h-4 w-4" />
            <kbd className="hidden lg:inline text-[10px] font-mono px-1.5 py-0.5 rounded border border-border bg-muted/60">Ctrl K</kbd>
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Language">
                <Languages className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="glass-card">
              {languages.map((lang) => (
                <DropdownMenuItem key={lang.code} onClick={() => onLanguageChange(lang.code)} className="flex justify-between">
                  {lang.name} {currentLang === lang.code && <Check className="w-3 h-3" />}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Toggle theme"
            className="relative"
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
          >
            <Sun className="h-4 w-4 transition-transform duration-500 rotate-0 scale-100 dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-4 w-4 transition-transform duration-500 rotate-90 scale-0 dark:rotate-0 dark:scale-100" />
          </Button>
        </div>

        {/* Barra de progreso de lectura */}
        <motion.div
          style={{ scaleX: progress }}
          className="absolute left-0 right-0 bottom-0 h-[2px] origin-left bg-gradient-to-r from-violet-500 via-blue-500 to-cyan-500"
        />
      </motion.div>
    </motion.header>
  );
}
